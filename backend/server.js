const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for simplicity (no external DB needed)
const playlists = {
    'chill-vibes': {
        id: 'chill-vibes',
        name: 'Chill Vibes',
        description: 'Relaxing tunes for your soul',
        tracks: [
            { id: 1, title: 'Midnight Dreams', artist: 'Cosmic Beats', album: 'Nightscape', duration: 234, imageUrl: 'https://picsum.photos/seed/album1/300/300' },
            { id: 2, title: 'Summer Vibes', artist: 'Solar Sounds', album: 'Sunshine Collection', duration: 198, imageUrl: 'https://picsum.photos/seed/album2/300/300' },
            { id: 3, title: 'Neon Lights', artist: 'Retro Wave', album: 'Synthwave Dreams', duration: 267, imageUrl: 'https://picsum.photos/seed/album3/300/300' },
            { id: 4, title: 'Ocean Waves', artist: 'Nature Sounds', album: 'Ambient Journey', duration: 312, imageUrl: 'https://picsum.photos/seed/album4/300/300' }
        ]
    },
    'workout-mix': {
        id: 'workout-mix',
        name: 'Workout Mix',
        description: 'High energy beats for your workout',
        tracks: [
            { id: 5, title: 'Power Up', artist: 'Energy Beats', album: 'Gym Motivation', duration: 198, imageUrl: 'https://picsum.photos/seed/album5/300/300' },
            { id: 6, title: 'Thunder Strike', artist: 'Bass Warriors', album: 'Intense Workout', duration: 210, imageUrl: 'https://picsum.photos/seed/album6/300/300' },
            { id: 7, title: 'Adrenaline Rush', artist: 'Fit Beats', album: 'Cardio Blast', duration: 187, imageUrl: 'https://picsum.photos/seed/album7/300/300' },
            { id: 8, title: 'Beast Mode', artist: 'Workout Kings', album: 'Training Hard', duration: 225, imageUrl: 'https://picsum.photos/seed/album8/300/300' }
        ]
    },
    'study-session': {
        id: 'study-session',
        name: 'Study Session',
        description: 'Focus music for deep work',
        tracks: [
            { id: 9, title: 'Focus Flow', artist: 'Study Sounds', album: 'Concentration', duration: 320, imageUrl: 'https://picsum.photos/seed/album9/300/300' },
            { id: 10, title: 'Calm Thoughts', artist: 'Peaceful Piano', album: 'Study Time', duration: 298, imageUrl: 'https://picsum.photos/seed/album10/300/300' },
            { id: 11, title: 'Deep Work', artist: 'Lo-fi Study', album: 'Productivity', duration: 256, imageUrl: 'https://picsum.photos/seed/album11/300/300' },
            { id: 12, title: 'Brain Waves', artist: 'Ambient Focus', album: 'Study Mix', duration: 340, imageUrl: 'https://picsum.photos/seed/album12/300/300' }
        ]
    },
    'party-anthems': {
        id: 'party-anthems',
        name: 'Party Anthems',
        description: 'Get the party started',
        tracks: [
            { id: 13, title: 'Dance All Night', artist: 'Party Starters', album: 'Club Hits', duration: 215, imageUrl: 'https://picsum.photos/seed/album13/300/300' },
            { id: 14, title: 'Turn It Up', artist: 'DJ Vibes', album: 'Party Mode', duration: 198, imageUrl: 'https://picsum.photos/seed/album14/300/300' },
            { id: 15, title: 'Weekend Party', artist: 'Club Bangers', album: 'Night Out', duration: 230, imageUrl: 'https://picsum.photos/seed/album15/300/300' },
            { id: 16, title: 'Lets Go', artist: 'Party People', album: 'Celebration', duration: 205, imageUrl: 'https://picsum.photos/seed/album16/300/300' }
        ]
    }
};

// Liked songs storage
let likedSongs = new Set([1, 3, 5]);

// Routes

// Get all playlists
app.get('/api/playlists', (req, res) => {
    const playlistList = Object.values(playlists).map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        trackCount: p.tracks.length
    }));
    res.json(playlistList);
});

// Get playlist by ID with tracks
app.get('/api/playlists/:id', (req, res) => {
    const playlist = playlists[req.params.id];
    if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
    }

    // Add liked status to each track
    const tracksWithLiked = playlist.tracks.map(track => ({
        ...track,
        isLiked: likedSongs.has(track.id)
    }));

    res.json({
        ...playlist,
        tracks: tracksWithLiked
    });
});

// Get all tracks
app.get('/api/tracks', (req, res) => {
    const allTracks = [];
    Object.values(playlists).forEach(playlist => {
        playlist.tracks.forEach(track => {
            if (!allTracks.find(t => t.id === track.id)) {
                allTracks.push({
                    ...track,
                    isLiked: likedSongs.has(track.id)
                });
            }
        });
    });
    res.json(allTracks);
});

// Get single track
app.get('/api/tracks/:id', (req, res) => {
    const trackId = parseInt(req.params.id);
    let foundTrack = null;

    Object.values(playlists).forEach(playlist => {
        const track = playlist.tracks.find(t => t.id === trackId);
        if (track) {
            foundTrack = {
                ...track,
                isLiked: likedSongs.has(track.id)
            };
        }
    });

    if (!foundTrack) {
        return res.status(404).json({ error: 'Track not found' });
    }

    res.json(foundTrack);
});

// Like/Unlike a track
app.post('/api/tracks/:id/like', (req, res) => {
    const trackId = parseInt(req.params.id);

    if (likedSongs.has(trackId)) {
        likedSongs.delete(trackId);
        res.json({ isLiked: false });
    } else {
        likedSongs.add(trackId);
        res.json({ isLiked: true });
    }
});

// Get liked songs
app.get('/api/liked', (req, res) => {
    const liked = [];
    Object.values(playlists).forEach(playlist => {
        playlist.tracks.forEach(track => {
            if (likedSongs.has(track.id) && !liked.find(t => t.id === track.id)) {
                liked.push({
                    ...track,
                    isLiked: true
                });
            }
        });
    });
    res.json(liked);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'ASH Player API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎵 ASH Player API running on http://localhost:${PORT}`);
    console.log(`📋 Endpoints:`);
    console.log(`   GET  /api/playlists`);
    console.log(`   GET  /api/playlists/:id`);
    console.log(`   GET  /api/tracks`);
    console.log(`   GET  /api/tracks/:id`);
    console.log(`   POST /api/tracks/:id/like`);
    console.log(`   GET  /api/liked`);
});
