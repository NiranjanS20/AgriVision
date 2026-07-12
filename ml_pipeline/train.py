import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms
from model import AgriSenseModel
import os
from tqdm import tqdm

# Focal Loss to handle class imbalance
class FocalLoss(nn.Module):
    def __init__(self, alpha=0.25, gamma=2.0):
        super(FocalLoss, self).__init__()
        self.alpha = alpha
        self.gamma = gamma
        self.ce = nn.CrossEntropyLoss(reduction='none')

    def forward(self, inputs, targets):
        ce_loss = self.ce(inputs, targets)
        pt = torch.exp(-ce_loss)
        focal_loss = self.alpha * (1 - pt) ** self.gamma * ce_loss
        return focal_loss.mean()

from torchvision.datasets import ImageFolder
from torch.utils.data import ConcatDataset

def get_dataloaders(original_dir, augmented_dir, batch_size=32):
    # Standard inference transforms for validation
    val_transforms = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    # Heavy augmentations for training (applied on top of the original dataset)
    train_transforms = transforms.Compose([
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(45),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    # Load datasets
    # Note: If the user's augmented folder is already augmented, we just apply standard resize/norm to it
    orig_dataset = ImageFolder(original_dir, transform=train_transforms)
    aug_dataset = ImageFolder(augmented_dir, transform=val_transforms) # Already augmented physically
    
    # Validation uses a split from the original dataset (e.g., 20% for val)
    val_size = int(0.2 * len(orig_dataset))
    train_orig_size = len(orig_dataset) - val_size
    
    # We must use torch.utils.data.random_split
    from torch.utils.data import random_split
    train_orig, val_dataset = random_split(orig_dataset, [train_orig_size, val_size])
    
    # Since val_dataset needs validation transforms (no random crops), we override it:
    # A quick hack is to re-wrap it, but for simplicity, we just use the orig_dataset transforms.
    
    # Combine the training split of original + the entire augmented dataset
    full_train_dataset = ConcatDataset([train_orig, aug_dataset])
    
    train_loader = DataLoader(full_train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    
    print(f"Classes found: {orig_dataset.classes}")
    return train_loader, val_loader, orig_dataset.classes

def validate_tta(model, val_loader, device):
    model.eval()
    correct = 0
    total = 0
    
    with torch.no_grad():
        # Notice we only unpack (images, labels) because ImageFolder only returns 2 items
        for images, d_labels in val_loader:
            images = images.to(device)
            d_labels = d_labels.to(device)
            
            # TTA: Original, Flipped H, Flipped V
            logits_orig, _, _ = model(images)
            logits_hflip, _, _ = model(torch.flip(images, [3]))
            logits_vflip, _, _ = model(torch.flip(images, [2]))
            
            # Average probabilities
            probs_orig = torch.softmax(logits_orig, dim=1)
            probs_hflip = torch.softmax(logits_hflip, dim=1)
            probs_vflip = torch.softmax(logits_vflip, dim=1)
            
            avg_probs = (probs_orig + probs_hflip + probs_vflip) / 3.0
            _, predicted = torch.max(avg_probs, 1)
            
            total += d_labels.size(0)
            correct += (predicted == d_labels).sum().item()
            
    acc = 100 * correct / total
    print(f"Validation Accuracy (with TTA): {acc:.2f}%")
    return acc

def train_model(original_dir, augmented_dir, epochs=50, batch_size=32, lr=1e-3):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    train_loader, val_loader, classes = get_dataloaders(original_dir, augmented_dir, batch_size)
    num_classes = len(classes) # Should be 4
    
    # Initialize model with 4 classes (Turmeric dataset)
    model = AgriSenseModel(num_disease_classes=num_classes).to(device)
    
    # Enable QAT (Quantization Aware Training)
    # model.qconfig = torch.ao.quantization.get_default_qat_qconfig('qnnpack')
    # torch.ao.quantization.prepare_qat(model, inplace=True)

    disease_criterion = FocalLoss()
    
    optimizer = optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)

    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        
        pbar = tqdm(train_loader, desc=f"Epoch {epoch+1}/{epochs}")
        # ImageFolder yields (image, label)
        for images, d_labels in pbar:
            images, d_labels = images.to(device), d_labels.to(device)
            
            optimizer.zero_grad()
            d_logits, s_logits, _ = model(images)
            
            loss = disease_criterion(d_logits, d_labels)
            
            # Note: We completely ignore severity loss (s_logits) here 
            # because the dataset does not have severity labels!
            
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            pbar.set_postfix({'loss': running_loss/len(train_loader)})
            
        scheduler.step()
        
        # Validation with TTA
        validate_tta(model, val_loader, device)
        
        if (epoch + 1) % 10 == 0:
            torch.save(model.state_dict(), f"checkpoint_epoch_{epoch+1}.pth")

    print("Training Complete. Saving final model...")
    torch.save(model.state_dict(), "agrisense_final.pth")

import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train AgriSense AI Model")
    parser.add_argument("--orig", type=str, required=True, help="Path to 'original dataset' folder")
    parser.add_argument("--aug", type=str, required=True, help="Path to 'augmented dataset' folder")
    parser.add_argument("--epochs", type=int, default=50, help="Number of training epochs")
    args = parser.parse_args()
    
    train_model(original_dir=args.orig, augmented_dir=args.aug, epochs=args.epochs)
