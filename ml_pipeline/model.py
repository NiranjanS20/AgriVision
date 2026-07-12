import torch
import torch.nn as nn
from torchvision.models import mobilenet_v3_large, MobileNet_V3_Large_Weights

class ChannelAttention(nn.Module):
    def __init__(self, in_planes, ratio=16):
        super(ChannelAttention, self).__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.max_pool = nn.AdaptiveMaxPool2d(1)
           
        self.fc = nn.Sequential(
            nn.Conv2d(in_planes, in_planes // ratio, 1, bias=False),
            nn.ReLU(),
            nn.Conv2d(in_planes // ratio, in_planes, 1, bias=False)
        )
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = self.fc(self.avg_pool(x))
        max_out = self.fc(self.max_pool(x))
        out = avg_out + max_out
        return out * self.sigmoid(out)

class SpatialAttention(nn.Module):
    def __init__(self, kernel_size=7):
        super(SpatialAttention, self).__init__()
        self.conv1 = nn.Conv2d(2, 1, kernel_size, padding=kernel_size//2, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = torch.mean(x, dim=1, keepdim=True)
        max_out, _ = torch.max(x, dim=1, keepdim=True)
        x_cat = torch.cat([avg_out, max_out], dim=1)
        out = self.conv1(x_cat)
        return out * self.sigmoid(out)

class CBAM(nn.Module):
    def __init__(self, in_planes, ratio=16, kernel_size=7):
        super(CBAM, self).__init__()
        self.ca = ChannelAttention(in_planes, ratio)
        self.sa = SpatialAttention(kernel_size)

    def forward(self, x):
        x = x * self.ca(x)
        x = x * self.sa(x)
        return x

class AgriSenseModel(nn.Module):
    def __init__(self, num_disease_classes=8, num_severity_classes=3):
        super(AgriSenseModel, self).__init__()
        
        # Load MobileNetV3-Large without the classification head
        mobilenet = mobilenet_v3_large(weights=MobileNet_V3_Large_Weights.DEFAULT)
        self.backbone = mobilenet.features # Output: (B, 960, 7, 7)
        
        # Replace the final pooling and classifier with our custom logic
        in_features = 960
        
        self.cbam = CBAM(in_features)
        
        # Quantization-friendly pooling
        self.pool = nn.AdaptiveAvgPool2d(1)
        self.flatten = nn.Flatten()
        
        # Multi-task Heads
        self.disease_head = nn.Linear(in_features, num_disease_classes)
        self.severity_head = nn.Linear(in_features, num_severity_classes)
        
        # Temperature Scaling parameter for confidence calibration
        self.temperature = nn.Parameter(torch.ones(1) * 1.5)

    def forward(self, x):
        # 1. Feature Extraction
        features = self.backbone(x)
        
        # 2. Attention
        attended_features = self.cbam(features)
        
        # 3. Pooling
        pooled = self.pool(attended_features)
        flat = self.flatten(pooled)
        
        # 4. Multi-Task Predictions
        disease_logits = self.disease_head(flat) / self.temperature
        severity_logits = self.severity_head(flat)
        
        # We also return attended_features because they are required 
        # to mathematically compute the Class Activation Map (CAM) on the edge.
        return disease_logits, severity_logits, attended_features

    def get_cam_weights(self):
        """
        Returns the weights of the disease head. 
        These are mathematically dotted with `attended_features` on the edge to generate CAM.
        """
        return self.disease_head.weight.data

class AgriSenseMobileViT(nn.Module):
    def __init__(self, num_disease_classes=8, num_severity_classes=3):
        super(AgriSenseMobileViT, self).__init__()
        from torchvision.models import mobile_vit_xx_small
        
        # Use MobileViT-XXS for INT8 edge quantization safety
        # We strip the default classifier to attach our dual heads
        base_model = mobile_vit_xx_small(weights='DEFAULT')
        self.features = base_model.features
        
        in_features = 320 # Output channels of MobileViT-XXS
        
        self.pool = nn.AdaptiveAvgPool2d(1)
        self.flatten = nn.Flatten()
        
        self.disease_head = nn.Linear(in_features, num_disease_classes)
        self.severity_head = nn.Linear(in_features, num_severity_classes)
        
        self.temperature = nn.Parameter(torch.ones(1) * 1.5)

    def forward(self, x):
        features = self.features(x)
        pooled = self.pool(features)
        flat = self.flatten(pooled)
        
        disease_logits = self.disease_head(flat) / self.temperature
        severity_logits = self.severity_head(flat)
        
        return disease_logits, severity_logits, features
    
    def get_cam_weights(self):
        return self.disease_head.weight.data
