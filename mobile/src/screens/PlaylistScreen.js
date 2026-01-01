import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { usePlayer } from '../context/PlayerContext';
import TrackItem from '../components/TrackItem';
import api from '../services/api';

export default function PlaylistScreen({ route, navigation }) {
    const { id, name } = route.params;
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const { loadTrack } = usePlayer();

    useEffect(() => {
        fetchPlaylist();
    }, [id]);

    const fetchPlaylist = async () => {
        try {
            const data = await api.getPlaylist(id);
            setPlaylist(data);
        } catch (error) {
            console.error('Error fetching playlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTrackPress = (track) => {
        if (playlist?.tracks) {
            loadTrack(track, playlist.tracks);
        }
    };

    const handlePlayAll = () => {
        if (playlist?.tracks?.length > 0) {
            loadTrack(playlist.tracks[0], playlist.tracks);
        }
    };

    const handleShuffle = () => {
        if (playlist?.tracks?.length > 0) {
            const randomIndex = Math.floor(Math.random() * playlist.tracks.length);
            loadTrack(playlist.tracks[randomIndex], playlist.tracks);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.accent} />
            </View>
        );
    }

    if (!playlist) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={48} color={colors.textTertiary} />
                <Text style={styles.errorText}>Playlist not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Playlist Header */}
                <LinearGradient
                    colors={[colors.gradientStart, 'transparent']}
                    style={styles.headerGradient}
                >
                    <View style={styles.header}>
                        <View style={styles.artworkContainer}>
                            <LinearGradient
                                colors={[colors.gradientStart, colors.gradientEnd]}
                                style={styles.artwork}
                            >
                                <Ionicons name="musical-notes" size={64} color={colors.textPrimary} />
                            </LinearGradient>
                        </View>
                        <Text style={styles.playlistName}>{playlist.name}</Text>
                        <Text style={styles.playlistDescription}>{playlist.description}</Text>
                        <Text style={styles.trackCount}>{playlist.tracks?.length || 0} tracks</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.shuffleButton}
                            onPress={handleShuffle}
                        >
                            <Ionicons name="shuffle" size={20} color={colors.textPrimary} />
                            <Text style={styles.buttonText}>Shuffle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={handlePlayAll}
                        >
                            <LinearGradient
                                colors={[colors.gradientStart, colors.gradientEnd]}
                                style={styles.playButtonGradient}
                            >
                                <Ionicons name="play" size={24} color={colors.textPrimary} />
                                <Text style={styles.playButtonText}>Play All</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Track List */}
                <View style={styles.trackList}>
                    {playlist.tracks?.map((track, index) => (
                        <TrackItem
                            key={track.id}
                            track={track}
                            index={index}
                            onPress={handleTrackPress}
                        />
                    ))}
                </View>

                {/* Bottom padding for player bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgPrimary,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.bgPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        backgroundColor: colors.bgPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        marginTop: spacing.md,
        color: colors.textTertiary,
        fontSize: fontSize.lg,
    },
    scrollView: {
        flex: 1,
    },
    headerGradient: {
        padding: spacing.lg,
        paddingTop: spacing.xl,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    artworkContainer: {
        marginBottom: spacing.lg,
    },
    artwork: {
        width: 180,
        height: 180,
        borderRadius: borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
    },
    playlistName: {
        fontSize: fontSize['2xl'],
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    playlistDescription: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    trackCount: {
        fontSize: fontSize.sm,
        color: colors.textTertiary,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.md,
    },
    shuffleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        gap: spacing.xs,
    },
    buttonText: {
        color: colors.textPrimary,
        fontSize: fontSize.base,
        fontWeight: '600',
    },
    playButton: {
        overflow: 'hidden',
        borderRadius: borderRadius.full,
    },
    playButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        gap: spacing.xs,
    },
    playButtonText: {
        color: colors.textPrimary,
        fontSize: fontSize.base,
        fontWeight: '700',
    },
    trackList: {
        padding: spacing.md,
    },
});
