# Contributing to AgriVision

First off, thank you for taking the time to contribute! 🎉

This document outlines a set of guidelines and best practices for contributing to AgriVision. Following these instructions helps ensure a smooth, professional, and efficient development cycle.

---

## 🛠️ Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to the project maintainers.

---

## 🗺️ How to Contribute

### 1. Find or Open an Issue
- Before making significant changes, please search active issues or open a new one to discuss your proposed feature or bug fix.

### 2. Branching Strategy
- We follow a standard git branch workflow:
  - `main` / `master` is the production branch.
  - Create feature branches off `main` using naming conventions:
    - `feat/feature-name` for new features.
    - `fix/bug-name` for bug fixes.
    - `docs/doc-name` for documentation updates.

### 3. Development Process
1. Fork the repository and clone it locally.
2. Create your feature branch:
   ```bash
   git checkout -b feat/my-new-feature
   ```
3. Implement your changes, following our [Coding Standards](#-coding-standards).
4. Run local validation and tests (see [Verification](#-verification)).
5. Commit your changes with clear, descriptive messages:
   ```bash
   git commit -m "feat: add real-time CAM overlay toggle button"
   ```
6. Push to your branch:
   ```bash
   git push origin feat/my-new-feature
   ```
7. Open a Pull Request (PR) against `main`.

---

## 🎨 Coding Standards

### Mobile App (TypeScript & React Native)
- **Formatting**: We use Prettier for code formatting. Please format your code before committing.
- **TypeScript**: Ensure strict typing. Avoid using `any` where possible.
- **Components**: Group reusable UI elements inside the `components/` directory, and views/pages inside `app/` (Expo Router).
- **Styling**: Leverage the predefined MD3 themes and tokens in `theme/`. Do not use hardcoded colors.

### Machine Learning Pipeline (Python & PyTorch)
- **Formatting**: Code must follow the **PEP 8** style guide.
- **Model Structure**: When modifying the model in `ml_pipeline/model.py`, ensure any new operations are fully compatible with ONNX decomposition to prevent export failures.
- **Logging**: Use descriptive print statements or standard python `logging` rather than silent exceptions.

---

## 🧪 Verification

Before submitting your PR, ensure that:
- The React Native application builds successfully without TypeScript or Lint errors:
  ```bash
  npx tsc --noEmit
  ```
- The ML exporter pipeline runs from start to finish without errors:
  ```bash
  cd ml_pipeline
  python export.py
  ```
- Your code does not introduce console errors, memory leaks, or uncalibrated confidence predictions.
