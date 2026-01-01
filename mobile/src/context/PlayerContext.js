import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(0); // 0: off, 1: all, 2: one
    const soundRef = useRef(null);

    useEffect(() => {
        // Configure audio mode
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
        });

        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const loadTrack = async (track, tracks = []) => {
        try {
            // Unload previous sound
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }

            setCurrentTrack(track);
            if (tracks.length > 0) {
                setPlaylist(tracks);
            }

            // For demo purposes, we'll use a placeholder audio
            // In production, you'd load from track.audioUrl
            // const { sound } = await Audio.Sound.createAsync(
            //   { uri: track.audioUrl },
            //   { shouldPlay: true, volume }
            // );

            // Simulate playback for demo (no actual audio files)
            setIsPlaying(true);
            setDuration(track.duration);
            setPosition(0);
        } catch (error) {
            console.error('Error loading track:', error);
        }
    };

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        if (!currentTrack || playlist.length === 0) return;

        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        let nextIndex;

        if (shuffle) {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } else {
            nextIndex = (currentIndex + 1) % playlist.length;
        }

        loadTrack(playlist[nextIndex], playlist);
    };

    const prevTrack = () => {
        if (!currentTrack || playlist.length === 0) return;

        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadTrack(playlist[prevIndex], playlist);
    };

    const seekTo = (pos) => {
        setPosition(pos);
        // In production: soundRef.current?.setPositionAsync(pos * 1000);
    };

    const toggleShuffle = () => setShuffle(!shuffle);
    const toggleRepeat = () => setRepeat((repeat + 1) % 3);

    // Simulate playback progress
    useEffect(() => {
        let interval;
        if (isPlaying && currentTrack) {
            interval = setInterval(() => {
                setPosition(pos => {
                    if (pos >= duration) {
                        if (repeat === 2) {
                            return 0; // Repeat one
                        } else if (repeat === 1 || playlist.length > 1) {
                            nextTrack(); // Next track
                            return 0;
                        } else {
                            setIsPlaying(false);
                            return duration;
                        }
                    }
                    return pos + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTrack, duration, repeat]);

    const value = {
        currentTrack,
        playlist,
        isPlaying,
        position,
        duration,
        volume,
        shuffle,
        repeat,
        loadTrack,
        play,
        pause,
        togglePlay,
        nextTrack,
        prevTrack,
        seekTo,
        setVolume,
        toggleShuffle,
        toggleRepeat,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
}
