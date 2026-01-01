import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { usePlayer } from '../context/PlayerContext';

export default function NowPlayingHero() {
    const { currentTrack, isPlaying } = usePlayer();

    if (!currentTrack) {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Select a song to play</Text>
                </View>
            </View>
        );
    }

    return (
        <LinearGradient
            colors={['rgba(102, 126, 234, 0.05)', 'transparent']}
            style={styles.container}
        >
            <View style={styles.artworkContainer}>
                <Image source={{ uri: currentTrack.imageUrl }} style={styles.artwork} />
                {isPlaying && (
                    <View style={styles.playingIndicator}>
                        <View style={[styles.bar, { animationDelay: '0ms' }]} />
                        <View style={[styles.bar, { animationDelay: '200ms' }]} />
                        <View style={[styles.bar, { animationDelay: '400ms' }]} />
                        <View style={[styles.bar, { animationDelay: '600ms' }]} />
                    </View>
                )}
            </View>

            <View style={styles.info}>
                <Text style={styles.label}>NOW PLAYING</Text>
                <Text style={styles.title} numberOfLines={2}>{currentTrack.title}</Text>
                <Text style={styles.artist}>{currentTrack.artist}</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl,
    },
    placeholderText: {
        fontSize: fontSize.lg,
        color: colors.textTertiary,
    },
    artworkContainer: {
        position: 'relative',
        width: 150,
        height: 150,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        marginRight: spacing.lg,
    },
    artwork: {
        width: '100%',
        height: '100%',
    },
    playingIndicator: {
        position: 'absolute',
        bottom: spacing.xs,
        right: spacing.xs,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 6,
        borderRadius: borderRadius.sm,
        gap: 3,
    },
    bar: {
        width: 3,
        height: 12,
        backgroundColor: colors.accent,
        borderRadius: 2,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    title: {
        fontSize: fontSize['2xl'],
        fontWeight: '800',
        color: colors.accent,
        marginBottom: spacing.xs,
    },
    artist: {
        fontSize: fontSize.lg,
        color: colors.textSecondary,
    },
});
