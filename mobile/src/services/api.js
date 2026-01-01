// API Service for ASH Player
import { Platform } from 'react-native';

// Use localhost for web, Android emulator IP for Android
const API_BASE_URL = Platform.OS === 'web'
    ? 'http://localhost:3001'
    : 'http://10.0.2.2:3001';
// For physical device, use your computer's IP address
// const API_BASE_URL = 'http://YOUR_IP:3001';

class ApiService {
    async getPlaylists() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/playlists`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching playlists:', error);
            return [];
        }
    }

    async getPlaylist(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/playlists/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching playlist:', error);
            return null;
        }
    }

    async getTracks() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tracks`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching tracks:', error);
            return [];
        }
    }

    async getTrack(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tracks/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching track:', error);
            return null;
        }
    }

    async toggleLike(trackId) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tracks/${trackId}/like`, {
                method: 'POST',
            });
            return await response.json();
        } catch (error) {
            console.error('Error toggling like:', error);
            return null;
        }
    }

    async getLikedSongs() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/liked`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching liked songs:', error);
            return [];
        }
    }
}

export default new ApiService();
