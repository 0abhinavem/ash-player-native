# ASH Player Mobile

A React Native music player application built with Expo, featuring a modern dark theme UI and full navigation support.

## Features

- 🎵 Music playback with Now Playing UI
- 📱 Cross-platform (Web, iOS, Android)
- 🎨 Beautiful dark theme with gradient accents
- 📋 Multiple playlists (Chill Vibes, Workout Mix, Study Session, Party Anthems)
- ❤️ Liked songs functionality
- 🔀 Shuffle and repeat modes

## Tech Stack

- **Frontend**: React Native + Expo
- **Navigation**: React Navigation 7 (Drawer + Native Stack)
- **State Management**: React Context API
- **Backend**: Express.js API
- **Styling**: React Native StyleSheet

## Getting Started

### Prerequisites

- Node.js (18+)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/ash-player-native.git
cd ash-player-native
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install mobile dependencies:
```bash
cd ../mobile
npm install
```

### Running the App

**Start the backend server:**
```bash
cd backend
npm start
```

**Start the mobile app:**
```bash
cd mobile
npx expo start --web  # For web
npx expo start        # For iOS/Android (scan QR with Expo Go)
```

## Project Structure

```
ash-player-native/
├── backend/
│   ├── server.js       # Express API server
│   └── package.json
└── mobile/
    ├── App.js          # Main app entry
    └── src/
        ├── components/  # Reusable UI components
        ├── screens/     # App screens
        ├── context/     # React context for state
        ├── services/    # API service
        └── theme/       # Colors, spacing, typography
```

## License

MIT
