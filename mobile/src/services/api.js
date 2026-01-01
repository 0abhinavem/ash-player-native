// API Service for ASH Player
import { Platform } from 'react-native';

// Production API URL (deployed on Vercel)
const PRODUCTION_API_URL = 'https://ash-player-native.vercel.app';

// Use production URL for deployed app, localhost for development
const API_BASE_URL = typeof __DEV__ !== 'undefined' && __DEV__
    ? (Platform.OS === 'web' ? 'http://localhost:3001' : 'http://10.0.2.2:3001')
    : PRODUCTION_API_URL;

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
