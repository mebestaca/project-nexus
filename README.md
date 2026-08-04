# Project Nexus

Project Nexus is a real-time multiplayer game lobby platform built with React Native and Expo. Players can create or join game lobbies instantly — no account creation required — and compete with friends across a growing library of classic games, starting with Four in a Row.

## Features

- **Frictionless onboarding** — Anonymous authentication lets players jump straight into a game with just a display name.
- **Live lobbies** — Create or join game rooms in real time, powered by Firebase Firestore for instant state synchronization across devices.
- **Extensible game engine** — Built to support multiple game types through a shared lobby and matchmaking architecture.
- **Cross-platform** — Runs on iOS and Android via Expo, with a single codebase.

## Tech Stack

| Category            | Technology                          |
|----------------------|--------------------------------------|
| Framework            | React Native, Expo (SDK 57), Expo Router |
| Backend              | Firebase (Authentication, Firestore) |
| Forms & Validation   | Formik, Yup                          |
| Language             | TypeScript                           |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 22.13.x or later
- [Expo Go](https://expo.dev/go) installed on a physical iOS or Android device
- A Firebase project with **Authentication** (Anonymous sign-in enabled) and **Firestore** configured

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project-nexus
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase (see below).

4. Configure environment variables (see below).

5. Start the development server:

   ```bash
   npx expo start
   ```

6. Scan the QR code with the Expo Go app on your device.

### Firebase Setup

This project requires a Firebase project with the following enabled:

1. **Authentication → Sign-in method → Anonymous** — must be enabled, or lobby creation will fail.
2. **Firestore Database** — create a Firestore database (in test mode is fine for local development) to store lobby data.

Once created, copy your Firebase project's config values into a `.env` file (see [Environment Variables](#environment-variables) below).

### Environment Variables

Create a `.env` file in the project root with your Firebase project credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note:** Variables prefixed with `EXPO_PUBLIC_` are bundled into the client at build time. Do not place server-only secrets in this file. **`.env` is not committed to this repository** — each contributor must create their own using the Firebase config values above.

## Known Limitations

- **No lobby persistence handling** — If a player closes or force-quits the app while in a lobby, their lobby is not currently cleaned up and will remain visible to other players as an abandoned entry.

## Roadmap

- [ ] Lobby cleanup for disconnected/inactive players (heartbeat-based staleness detection + Firestore TTL)
- [ ] Additional game types beyond Four in a Row
- [ ] Player statistics and match history


## Contributing

1. Create a feature branch from `main`.
2. Make your changes and ensure `npx expo-doctor` passes with no issues.
3. Open a pull request with a clear description of the change.

## License

This project was developed as part of a course assignment and is not currently licensed for external use.
