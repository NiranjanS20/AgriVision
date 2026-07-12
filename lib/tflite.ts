import { useEffect, useState } from 'react';
import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';

/**
 * Custom hook to load and manage the lifecycle of the TFLite Hybrid CNN-ViT model.
 * 
 * Note: Place your `.tflite` model in the assets folder and require it here.
 * For now, this is the architectural placeholder ready for the real model.
 */
export function useTFLiteModel() {
  const [model, setModel] = useState<TensorflowModel | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadModel() {
      try {
        // Load the finalized INT8 model with NNAPI/XNNPACK acceleration
        const tfliteModel = await loadTensorflowModel(
          require('../assets/model/agrisense_int8.tflite')
        );
        setModel(tfliteModel);
        
        console.log('TFLite Model architecture initialized and loaded into memory.');
      } catch (e) {
        console.error("Failed to load TFLite model:", e);
        setError(e as Error);
      }
    }
    loadModel();
  }, []);

  return { model, error };
}

/**
 * Run inference on a pre-processed TensorImage.
 */
export async function runInference(model: TensorflowModel, tensor: Uint8Array) {
  if (!model) throw new Error("Model not loaded");
  return await model.run([tensor]);
}

/**
 * Run inference using Test-Time Augmentation (TTA) on the edge.
 * In a real application, you would pass 3 sequentially captured frames from the Expo Camera,
 * or mathematically flip the Uint8Array tensor.
 * This averages the predictions to stabilize shaky hands.
 */
export async function runInferenceWithTTA(model: TensorflowModel, frames: Uint8Array[]) {
  if (!model) throw new Error("Model not loaded");
  if (frames.length === 0) throw new Error("No frames provided for TTA");
  
  let totalScores: Float32Array | null = null;
  
  for (const frame of frames) {
    const result = await model.run([frame]);
    // Assume result[0] is the softmax array of shape [8]
    const scores = result[0] as Float32Array;
    
    if (!totalScores) {
      totalScores = new Float32Array(scores.length);
    }
    
    for (let i = 0; i < scores.length; i++) {
      totalScores[i] += scores[i];
    }
  }
  
  // Average the scores
  if (totalScores) {
    for (let i = 0; i < totalScores.length; i++) {
      totalScores[i] /= frames.length;
    }
  }
  
  return totalScores;
}
