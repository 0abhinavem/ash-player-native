import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { usePlayer } from '../context/PlayerContext';

export default function TrackItem({ track, index, onPress }) {
    const { currentTrack } = usePlayer();
    const isActive = currentTrack?.id === track.id;

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <TouchableOpacity
            style={[styles.container, isActive && styles.active]}
            onPress={() => onPress(track)}
            activeOpacity={0.7}
        >
            <Text style={[styles.number, isActive && styles.activeText]}>
                {index + 1}
            </Text>

            <Image source={{ uri: track.imageUrl }} style={styles.albumArt} />

            <View style={styles.info}>
                <Text style={[styles.title, isActive && styles.activeText]} numberOfLines={1}>
                    {track.title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                    {track.artist}
                </Text>
            </View>

            <Text style={styles.duration}>{formatDuration(track.duration)}</Text>

            <TouchableOpacity style={styles.likeButton}>
                <Ionicons
                    name={track.isLiked ? 'heart' : 'heart-outline'}
                    size={20}
                    color={track.isLiked ? colors.danger : colors.textTertiary}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.sm,
        borderRadius: borderRadius.md,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        marginBottom: spacing.xs,
    },
    active: {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(102, 126, 234, 0.5)',
    },
    number: {
        width: 30,
        fontSize: fontSize.sm,
        color: colors.textTertiary,
        fontWeight: '600',
        textAlign: 'center',
    },
    activeText: {
        color: colors.accent,
    },
    albumArt: {
        width: 50,
        height: 50,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
    },
    info: {
        flex: 1,
        marginRight: spacing.sm,
    },
    title: {
        fontSize: fontSize.base,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    artist: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
    },
    duration: {
        fontSize: fontSize.sm,
        color: colors.textTertiary,
        fontWeight: '500',
        marginRight: spacing.sm,
    },
    likeButton: {
        padding: spacing.xs,
    },
});
