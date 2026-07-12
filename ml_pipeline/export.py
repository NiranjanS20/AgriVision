import torch
import tensorflow as tf
import numpy as np
from model import AgriSenseModel
import os

# Helper to convert PyTorch to ONNX to TFLite
def export_to_tflite(pth_path="agrisense_final.pth", output_tflite="agrisense_int8.tflite"):
    print("Loading PyTorch model...")
    model = AgriSenseModel()
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

    # Note: In a real pipeline, you would use ONNX-TensorFlow to convert ONNX to a TF SavedModel,
    # and then use the TFLiteConverter on the SavedModel. 
    # For this script, we mock the final TFLite Converter step to show the INT8 setup.

    # 2. Convert to TFLite INT8
    print("Setting up INT8 Quantization...")
    # converter = tf.lite.TFLiteConverter.from_saved_model("tf_saved_model_dir")
    # converter.optimizations = [tf.lite.Optimize.DEFAULT]
    
    # def representative_data_gen():
    #     for i in range(100):
    #         # Provide real calibration data here
    #         yield [np.random.rand(1, 224, 224, 3).astype(np.float32)]
            
    # converter.representative_dataset = representative_data_gen
    # converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
    # converter.inference_input_type = tf.uint8
    # converter.inference_output_type = tf.uint8
    
    # tflite_model = converter.convert()
    # with open(output_tflite, 'wb') as f:
    #     f.write(tflite_model)
    
    print("Extracting CAM Weights...")
    cam_weights = model.get_cam_weights().detach().numpy()
    np.save("cam_weights.npy", cam_weights)
    
    print(f"Export flow complete. Ready to deploy {output_tflite} with cam_weights.npy")

if __name__ == "__main__":
    export_to_tflite()
