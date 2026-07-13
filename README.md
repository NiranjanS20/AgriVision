# 🌱 AgriVision

[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**AgriVision** is a premium, real-time mobile crop disease diagnosis and severity assessment platform. Powered by an on-device multi-task deep learning model running directly on the edge, AgriVision empowers farmers and agronomists with instant, offline insights to protect crop health.

---

## ✨ Key Features

- 📸 **Real-Time Diagnostics**: Instant, offline crop disease classification using your device's camera.
- 📊 **Multi-Task Assessment**: Jointly predicts **Disease Category** (8 classes) and **Severity Level** (3 classes) in a single feed-forward pass.
- 🗺️ **Class Activation Mapping (CAM)**: Renders a real-time heatmap overlay of the leaf showing exactly where the neural network is focusing its attention.
- 🗃️ **Local History & Library**: Save diagnostic results, browse previous scans, and read detailed crop disease library cards offline.
- 🌐 **Localization Support**: Ready-to-go translation infrastructure (`i18n`) for multi-language support.

---

## 🛠️ Tech Stack & Architecture

### Mobile Application
- **Framework**: [Expo](https://expo.dev/) (React Native) with [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based navigation)
- **UI & Theme**: [React Native Paper](https://reactnativepaper.com/) & [React Native Reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)
- **On-Device Inference**: [React Native Fast TFLite](https://github.com/mrousavy/react-native-fast-tflite) for ultra-fast, GPU/NPU-accelerated model execution on Android & iOS.

### Machine Learning Pipeline (`ml_pipeline/`)
- **Core Model**: PyTorch-based **MobileNetV3-Large** backbone coupled with a custom **CBAM** (Convolutional Block Attention Module) spatial and channel attention block.
- **Explainable AI (XAI)**: The model preserves spatial attention tensors, allowing mathematical computation of the Class Activation Map (CAM) directly on the mobile edge.
- **Quantization Pipeline**: Python script to export PyTorch weights (`.pth`) to ONNX, build a TensorFlow SavedModel, and compile to an `INT8` quantized `.tflite` model optimized for mobile hardware.

---

## 📂 Project Structure

```bash
AgriVision/
├── app/                  # Expo Router screens (Home, Camera, Results, History, Profile)
├── components/           # Reusable UI components (Result cards, camera overlays, status bars)
├── constants/            # Styling, layout, and global app constants
├── theme/                # MD3/React Native Paper styling and color tokens
├── i18n/                 # Localization & internationalization files
├── lib/                  # Utility functions & local storage interfaces
├── ml_pipeline/          # PyTorch training, model architecture, and TFLite export tools
│   ├── model.py          # MobileNetV3 + CBAM model structure with multi-task heads
│   ├── train.py          # Model training code with dataset loading
│   └── export.py         # PyTorch -> ONNX -> TensorFlow -> TFLite INT8 exporter
└── package.json          # React Native dependencies & scripts
```

---

## 🚀 Getting Started

### 📱 Running the Mobile App

#### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app on your phone (for quick testing) or Android Studio / Xcode (for local builds)

#### Setup Steps
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   npm run dev
   # or
   npx expo start
   ```
3. Open the application using Expo Go on your mobile device by scanning the QR code, or press `a` for Android or `i` for iOS to boot up an emulator.

---

### 🧠 Setting up the ML Pipeline

#### Prerequisites
- Python 3.10+
- PyTorch (with CUDA support recommended for training)

#### Setup Steps
1. Navigate to the ML pipeline directory:
   ```bash
   cd ml_pipeline
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. **Training**: Train the model on your custom dataset:
   ```bash
   python train.py
   ```
4. **Exporting**: Convert the trained model to INT8 quantized TFLite format:
   ```bash
   python export.py
   ```
   *Note: This generates `agrisense_int8.tflite` and `cam_weights.npy` which are copied directly into the mobile application's assets.*

---

## 📄 License & Standards

This project is licensed under the MIT License. Contributions must adhere to our [CONTRIBUTING.md](CONTRIBUTING.md) and respect the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
