# ASH Player Mobile - Deployment Guide

## Quick Deploy Options

### Option 1: Deploy with Vercel (Recommended)

#### Deploy Backend API
1. Go to [vercel.com](https://vercel.com) and log in with GitHub
2. Click "Add New Project"
3. Import `ash-player-native` repository
4. Set Root Directory to `backend`
5. Click Deploy

Your backend will be live at: `https://your-project-name.vercel.app`

#### Deploy Mobile Web App
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import `ash-player-native` repository
4. Set Root Directory to `mobile`
5. Override Build Command: `npx expo export -p web`
6. Override Output Directory: `dist`
7. Add Environment Variable:
   - `EXPO_PUBLIC_API_URL` = `https://your-backend-url.vercel.app`
8. Click Deploy

---

### Option 2: Deploy Backend to Render.com

1. Go to [render.com](https://render.com) and connect GitHub
2. Create New Web Service
3. Select `ash-player-native` repository
4. Set Root Directory to `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Click Create Web Service

---

### Option 3: Local Network Testing

For testing on your phone over local network:

1. Find your computer's IP address:
   ```bash
   ipconfig   # Windows
   ifconfig   # Mac/Linux
   ```

2. Update `mobile/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP:3001';
   ```

3. Run the servers:
   ```bash
   cd backend && npm start
   cd mobile && npx expo start
   ```

4. Scan the QR code with Expo Go app on your phone

---

## After Deployment

Once your backend is deployed, update the API URL in the mobile app:

Edit `mobile/src/services/api.js`:
```javascript
const PRODUCTION_API_URL = 'https://your-deployed-backend-url.vercel.app';

const API_BASE_URL = __DEV__ 
    ? (Platform.OS === 'web' ? 'http://localhost:3001' : 'http://10.0.2.2:3001')
    : PRODUCTION_API_URL;
```
