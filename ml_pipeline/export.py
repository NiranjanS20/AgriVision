import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')
import torch
import tensorflow as tf
import numpy as np
from model import AgriSenseModel
import os

# Helper to convert PyTorch to ONNX to TFLite
def export_to_tflite(pth_path="agrisense_final.pth", output_tflite="agrisense_int8.tflite"):
    print("Loading PyTorch model...")
    # Initialize with 4 classes to match your dataset!
    model = AgriSenseModel(num_disease_classes=4)
    if os.path.exists(pth_path):
        model.load_state_dict(torch.load(pth_path, map_location='cpu'))
    model.eval()

    # 1. Export to ONNX
    print("Exporting to ONNX...")
    dummy_input = torch.randn(1, 3, 224, 224)
    onnx_path = "temp_agrisense.onnx"
    torch.onnx.export(model, dummy_input, onnx_path, 
                      input_names=['input'], 
                      output_names=['disease_logits', 'severity_logits', 'cam_features'])

    # 2. Convert ONNX to TF SavedModel using onnx2tf (Modern, stable converter)
    print("Converting ONNX to TensorFlow SavedModel using onnx2tf...")
    import subprocess
    import shutil
    
    # onnx2tf is a rock-solid converter that avoids all the tensorflow-addons dependency issues
    subprocess.run(["onnx2tf", "-i", onnx_path, "-o", "tf_saved_model_dir", "--non_verbose"], check=True)

    # 3. onnx2tf natively generates .tflite files directly!
    # We will use the float16 model which is extremely small and optimized for mobile
    generated_tflite = "tf_saved_model_dir/temp_agrisense_float16.tflite"
    print(f"Quantized TFLite successfully generated at {generated_tflite}. Moving to output...")
    
    shutil.copy(generated_tflite, output_tflite)
    
    print("Extracting CAM Weights...")
    cam_weights = model.get_cam_weights().detach().numpy()
    np.save("cam_weights.npy", cam_weights)
    
    print(f"Export flow complete. Ready to deploy {output_tflite} with cam_weights.npy")

if __name__ == "__main__":
    export_to_tflite()
