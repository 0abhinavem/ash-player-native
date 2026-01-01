import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { usePlayer } from '../context/PlayerContext';

export default function PlayerBar() {
    const navigation = useNavigation();
    const {
        currentTrack,
        isPlaying,
        position,
        duration,
        togglePlay,
        nextTrack,
        prevTrack,
    } = usePlayer();

    if (!currentTrack) return null;

    const progress = duration > 0 ? (position / duration) * 100 : 0;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const openNowPlaying = () => {
        navigation.navigate('NowPlaying');
    };

    return (
        <View style={styles.container}>
            {/* Progress Bar */}
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <View style={styles.content}>
                {/* Track Info - Tappable to open Now Playing */}
                <TouchableOpacity
                    style={styles.trackInfo}
                    onPress={openNowPlaying}
                    activeOpacity={0.7}
                >
                    <Image source={{ uri: currentTrack.imageUrl }} style={styles.albumArt} />
                    <View style={styles.textInfo}>
                        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
                        <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
                    </View>
                </TouchableOpacity>

                {/* Controls */}
                <View style={styles.controls}>
                    <TouchableOpacity onPress={prevTrack} style={styles.controlButton}>
                        <Ionicons name="play-skip-back" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
                        <LinearGradient
                            colors={[colors.gradientStart, colors.gradientEnd]}
                            style={styles.playButtonGradient}
                        >
                            <Ionicons
                                name={isPlaying ? 'pause' : 'play'}
                                size={24}
                                color={colors.textPrimary}
                            />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={nextTrack} style={styles.controlButton}>
                        <Ionicons name="play-skip-forward" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Expand Button */}
                <TouchableOpacity onPress={openNowPlaying} style={styles.expandButton}>
                    <Ionicons name="chevron-up" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.bgElevated,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    progressBar: {
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.accent,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.sm,
    },
    trackInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    albumArt: {
        width: 50,
        height: 50,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
    },
    textInfo: {
        flex: 1,
    },
    title: {
        fontSize: fontSize.sm,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 2,
    },
    artist: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    controlButton: {
        padding: spacing.xs,
    },
    playButton: {
        marginHorizontal: spacing.xs,
    },
    playButtonGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    expandButton: {
        padding: spacing.sm,
        marginLeft: spacing.xs,
    },
});
