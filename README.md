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

3. Configure environment variables (see below).

4. Start the development server:

   ```bash
   npx expo start
   ```

5. Scan the QR code with the Expo Go app on your device.

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

> **Note:** Variables prefixed with `EXPO_PUBLIC_` are bundled into the client at build time. Do not place server-only secrets in this file.

## Project Structure

```
src/
├── app/            # Expo Router screens and navigation
├── components/     # Reusable UI components
├── context/         # React context providers (e.g., authentication state)
├── firebase/        # Firebase configuration and initialization
├── hooks/            # Custom React hooks
├── services/         # Data access and business logic (e.g., auth, lobbies)
├── styles/           # Shared styling
├── types/            # TypeScript type definitions
└── validation/       # Formik/Yup schemas
```

## Roadmap

- [ ] Additional game types beyond Four in a Row
- [ ] In-lobby chat
- [ ] Player statistics and match history
- [ ] Spectator mode

## Contributing

1. Create a feature branch from `main`.
2. Make your changes and ensure `npx expo-doctor` passes with no issues.
3. Open a pull request with a clear description of the change.

## License

This project was developed as part of a course assignment and is not currently licensed for external use.
