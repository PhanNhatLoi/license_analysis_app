# License Analysis App

## 📋 Project Name

**license\_analysis\_app**

## 🚀 Technologies Used

* **React Native**
* **OpenAI GPT API**

## 🎯 Main Purpose

This mobile application allows users to:

* Scan and recognize vehicle license plates.
* Analyze the license plate data.
* Provide numerological insights based on the recognized license plate.

## 🛠️ Installation & Running

Follow the steps below to get the app running locally on your machine:

### 1. Clone the repository:

```bash
git clone https://github.com/PhanNhatLoi/license_analysis_app.git
cd license_analysis_app
```

### 2. Install dependencies:

Using npm:

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

### 3. Setup environment variables:

Create a `.env` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start the app:

To run on Android:

```bash
npx react-native run-android
```

To run on iOS:

```bash
npx react-native run-ios
```

Make sure you have the Android emulator or Xcode properly configured.

## 📦 Features

* OCR-based license plate detection
* GPT-powered analysis and numerology explanation
* Responsive UI with smooth animations
