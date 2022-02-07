# NASA NEOs

An app that allows users to display Near Earth Objects (NEOs) for a given date. Created using React Native and Expo.

## Installation

1. Clone this repository

2. Install Expo command line tools and project dependencies:
```
$ npm install expo-cli -g
$ yarn install
```

3. This app requires an API key from the [NASA NEO API](https://api.nasa.gov/).
Create a `.env` file and set `API_KEY`:
```
API_KEY=<api key>
```

3. To run in an iOS simulator:
```
$ expo run:ios
```
This requires [Xcode](https://developer.apple.com/xcode/).

4. To run in an Android simulator:
```
$ expo run:android
```
This requires [Android Studio](https://developer.android.com/studio) and a local Java installation (Java 8 recommended for compatibility).
It also requires `ANDROID_SDK` and `ANDROID_SDK_ROOT` environment variables to be set to your local Android SDK location.

## Troubleshooting
Ensure all external dependencies are installed. If app build fails, remove the `ios`/`android` directories and try again.
