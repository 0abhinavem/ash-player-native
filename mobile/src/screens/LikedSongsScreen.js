import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { usePlayer } from '../context/PlayerContext';
import TrackItem from '../components/TrackItem';
import api from '../services/api';

export default function LikedSongsScreen({ navigation }) {
    const [likedSongs, setLikedSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loadTrack } = usePlayer();

    useEffect(() => {
        fetchLikedSongs();
    }, []);

    const fetchLikedSongs = async () => {
        try {
            const data = await api.getLikedSongs();
            setLikedSongs(data);
        } catch (error) {
            console.error('Error fetching liked songs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTrackPress = (track) => {
        loadTrack(track, likedSongs);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.accent} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <LinearGradient
                    colors={[colors.danger + '40', 'transparent']}
                    style={styles.headerGradient}
                >
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="heart" size={64} color={colors.danger} />
                        </View>
                        <Text style={styles.title}>Liked Songs</Text>
                        <Text style={styles.subtitle}>{likedSongs.length} songs</Text>
                    </View>
                </LinearGradient>

                {/* Track List */}
                <View style={styles.trackList}>
                    {likedSongs.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="heart-outline" size={64} color={colors.textTertiary} />
                            <Text style={styles.emptyTitle}>No liked songs yet</Text>
                            <Text style={styles.emptyText}>
                                Tap the heart icon on any song to add it here
                            </Text>
                        </View>
                    ) : (
                        likedSongs.map((track, index) => (
                            <TrackItem
                                key={track.id}
                                track={track}
                                index={index}
                                onPress={handleTrackPress}
                            />
                        ))
                    )}
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
    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: borderRadius.lg,
        backgroundColor: 'rgba(245, 87, 108, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: fontSize['2xl'],
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
    },
    trackList: {
        padding: spacing.md,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: spacing.xl * 2,
    },
    emptyTitle: {
        fontSize: fontSize.xl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    emptyText: {
        fontSize: fontSize.base,
        color: colors.textTertiary,
        textAlign: 'center',
        paddingHorizontal: spacing.xl,
    },
});
