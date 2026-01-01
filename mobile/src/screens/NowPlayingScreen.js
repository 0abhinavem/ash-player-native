import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { usePlayer } from '../context/PlayerContext';

const { width } = Dimensions.get('window');

export default function NowPlayingScreen({ navigation }) {
    const {
        currentTrack,
        isPlaying,
        position,
        duration,
        shuffle,
        repeat,
        togglePlay,
        nextTrack,
        prevTrack,
        seekTo,
        toggleShuffle,
        toggleRepeat,
    } = usePlayer();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getRepeatIcon = () => {
        if (repeat === 2) return 'repeat-one';
        return 'repeat';
    };

    if (!currentTrack) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-down" size={32} color={colors.textPrimary} />
                </TouchableOpacity>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No track playing</Text>
                </View>
            </View>
        );
    }

    return (
        <LinearGradient
            colors={[colors.bgSecondary, colors.bgPrimary]}
            style={styles.container}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-down" size={32} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Now Playing</Text>
                <TouchableOpacity style={styles.optionsButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            {/* Album Artwork */}
            <View style={styles.artworkContainer}>
                <Image
                    source={{ uri: currentTrack.imageUrl }}
                    style={styles.artwork}
                />
            </View>

            {/* Track Info */}
            <View style={styles.trackInfo}>
                <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
                <Text style={styles.artist}>{currentTrack.artist}</Text>
                <Text style={styles.album}>{currentTrack.album}</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <Slider
                    style={styles.slider}
                    value={position}
                    minimumValue={0}
                    maximumValue={duration || 1}
                    onSlidingComplete={seekTo}
                    minimumTrackTintColor={colors.accent}
                    maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
                    thumbTintColor={colors.accent}
                />
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{formatTime(position)}</Text>
                    <Text style={styles.time}>{formatTime(duration)}</Text>
                </View>
            </View>

            {/* Controls */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={toggleShuffle}
                >
                    <Ionicons
                        name="shuffle"
                        size={24}
                        color={shuffle ? colors.accent : colors.textSecondary}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={prevTrack}
                >
                    <Ionicons name="play-skip-back" size={36} color={colors.textPrimary} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePlay}
                >
                    <LinearGradient
                        colors={[colors.gradientStart, colors.gradientEnd]}
                        style={styles.playButtonGradient}
                    >
                        <Ionicons
                            name={isPlaying ? 'pause' : 'play'}
                            size={40}
                            color={colors.textPrimary}
                        />
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={nextTrack}
                >
                    <Ionicons name="play-skip-forward" size={36} color={colors.textPrimary} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={toggleRepeat}
                >
                    <Ionicons
                        name={getRepeatIcon()}
                        size={24}
                        color={repeat > 0 ? colors.accent : colors.textSecondary}
                    />
                </TouchableOpacity>
            </View>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.bottomButton}>
                    <Ionicons name="heart-outline" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton}>
                    <Ionicons name="share-outline" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton}>
                    <Ionicons name="list" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.xl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    closeButton: {
        padding: spacing.xs,
    },
    headerTitle: {
        fontSize: fontSize.base,
        fontWeight: '600',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    optionsButton: {
        padding: spacing.xs,
    },
    artworkContainer: {
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xl,
    },
    artwork: {
        width: width - spacing.xl * 2,
        height: width - spacing.xl * 2,
        borderRadius: borderRadius.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 25,
        elevation: 20,
    },
    trackInfo: {
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: fontSize['2xl'],
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    artist: {
        fontSize: fontSize.lg,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    album: {
        fontSize: fontSize.base,
        color: colors.textTertiary,
    },
    progressContainer: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -spacing.sm,
    },
    time: {
        fontSize: fontSize.xs,
        color: colors.textTertiary,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    secondaryButton: {
        padding: spacing.sm,
    },
    controlButton: {
        padding: spacing.sm,
    },
    playButton: {
        marginHorizontal: spacing.md,
    },
    playButtonGradient: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.xl,
    },
    bottomButton: {
        padding: spacing.md,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: fontSize.lg,
        color: colors.textTertiary,
    },
});
