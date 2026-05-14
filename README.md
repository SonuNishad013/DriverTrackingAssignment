# DriverTracker

A React Native application for tracking drivers on a map, built with TypeScript and featuring real-time marker animations.

## Project Setup

This project was created using the React Native CLI:

```sh
npx @react-native-community/cli init DriverTracker
```

## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- React Native development environment set up ([see guide](https://reactnative.dev/docs/set-up-your-environment))

### Installation

1. Install dependencies:

```sh
yarn install
```

2. For iOS, install CocoaPods dependencies:

```sh
yarn pod
# or
cd ios && pod install && cd ..
```

### Running the App

1. Start Metro bundler:

```sh
yarn start
# or
npm start
```

2. Run on Android:

```sh
yarn android
# or
npm run android
```

3. Run on iOS:

```sh
yarn ios
# or
npm run ios
```

## Dependencies

- `react-native-maps`: For displaying Google Maps and markers
- `react-native-config`: For managing environment variables securely
- `react-native-gesture-handler`: For gesture handling
- `react-native-safe-area-context`: For safe area insets

## Google Maps API Setup

### Obtaining API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Maps SDK for Android and Maps SDK for iOS
4. Create credentials (API Key)

### Restricting API Key

For security, restrict the API key:

1. In Google Cloud Console, go to APIs & Services > Credentials
2. Select your API key
3. Under "Application restrictions":
   - Choose "Android apps" and/or "iOS apps"
   - Add your app's package name/bundle ID
4. Under "API restrictions":
   - Restrict to Maps SDK for Android and Maps SDK for iOS

### Storing API Key Securely

1. Create a `.env` file in the project root (already exists)
2. Add your API key:

```
GOOGLE_MAPS_API_KEY=your_api_key_here
```

3. The app uses `react-native-config` to access environment variables securely
4. Add `.env` to `.gitignore` to prevent committing sensitive data

## How the App Works

### Driver Data Generation

- Driver data is generated randomly using utility functions in `src/utils/helper.tsx`
- Each driver has:
  - Unique ID and name
  - Vehicle information (type and number plate)
  - Trust score and rating
  - Initial coordinates near a center location (Chandigarh area)

### Map and Markers

- Uses `react-native-maps` with Google Maps provider
- Displays animated markers for each driver
- Markers use a custom taxi icon (`src/assets/Texi.png`)

### Real-time Movement

- Drivers' positions update every 2 seconds
- Movement is simulated with small random coordinate changes
- Uses `AnimatedRegion` for smooth marker animations
- Animation duration: 1500ms for each move

### Performance Optimizations

- `tracksViewChanges={false}` on markers to prevent unnecessary re-renders
- Driver data is memoized using `useMemo` hook
- Limited to 12 drivers to maintain performance
- Uses native animations with `useNativeDriver: false` for coordinate changes

### Driver Details Display

- Tapping a marker selects the driver
- Shows a sliding card (`DriverCard` component) with:
  - Driver photo and verification badge
  - Trust score and rating
  - Vehicle details
- Card animates in from bottom with spring animation

### Selected Marker Highlighting

- When a driver is selected, the detail card appears
- The selected driver's information is prominently displayed
- Close button animates the card out and deselects the driver

## Project Structure

```
src/
  assets/          # Images and icons
  components/      # Reusable components (DriverCard)
  data/           # Driver data generation
  screens/        # Main screens (MapScreen)
  utils/          # Helper functions
```

## Development

- Run tests: `yarn test`
- Lint code: `yarn lint`
- Format code: `npx prettier --write .`
# DriverTrackingAssignment
