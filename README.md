# Tribe Test

Cross-platform React Native App that displays a list of currency conversion rates of USD to other currencies.

## Description

This project is a React Native application that fetches and displays currency conversion rates from USD to various other currencies. It's designed to work on both iOS and Android platforms.

## Setup and Installation

Follow these steps to set up and run the project:

1. **Prerequisites**

   - Node.js (v12 or newer)
   - npm or yarn
   - React Native CLI
   - Xcode (for iOS development)
   - Android Studio (for Android development)

2. **Clone the repository**

   ```
   git clone https://github.com/ztoc/React-Native-Currency-Rate.git
   cd tribe-test
   ```

3. **Install dependencies**

   ```
   npm install
   # or
   yarn install
   ```

4. **iOS Setup**

   ```
   cd ios
   pod install
   cd ..
   ```

5. **Run the app**

   For iOS:

   ```
   npx react-native run-ios
   ```

   For Android:

   ```
   npx react-native run-android
   ```

## Development

To start the Metro bundler:

```
npx react-native start
```

## Testing

To run tests:

```
npm test
# or
yarn test
```

## Building for Production

For iOS:

1. Open the project in Xcode
2. Select "Product" > "Archive"
3. Follow the prompts to create an IPA file

For Android:

1. Run `cd android && ./gradlew assembleRelease`
2. The APK will be in `android/app/build/outputs/apk/release/`

## Troubleshooting

If you encounter any issues during setup or running the app, please check the [React Native documentation](https://reactnative.dev/docs/environment-setup) for common solutions.

## Author

This app was created by [Miniblaster](https://github.com/miniblaster).
