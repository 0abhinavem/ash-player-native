import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { usePlayer } from '../context/PlayerContext';
import NowPlayingHero from '../components/NowPlayingHero';
import TrackItem from '../components/TrackItem';
import api from '../services/api';

export default function HomeScreen({ navigation }) {
    const [playlists, setPlaylists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { loadTrack } = usePlayer();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [playlistData, trackData] = await Promise.all([
                api.getPlaylists(),
                api.getTracks(),
            ]);
            setPlaylists(playlistData);
            setTracks(trackData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const handleTrackPress = (track) => {
        loadTrack(track, tracks);
    };

    const handlePlaylistPress = (playlist) => {
        navigation.navigate('Playlist', { id: playlist.id, name: playlist.name });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.accent} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.accent}
                    />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Ionicons name="menu" size={28} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>ASH Player</Text>
                    <TouchableOpacity
                        style={styles.heartButton}
                        onPress={() => navigation.navigate('LikedSongs')}
                    >
                        <Ionicons name="heart" size={24} color={colors.danger} />
                    </TouchableOpacity>
                </View>

                {/* Now Playing Hero */}
                <NowPlayingHero />

                {/* Playlists Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Playlists</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.playlistScroll}
                    >
                        {playlists.map((playlist) => (
                            <TouchableOpacity
                                key={playlist.id}
                                style={styles.playlistCard}
                                onPress={() => handlePlaylistPress(playlist)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={[colors.gradientStart, colors.gradientEnd]}
                                    style={styles.playlistGradient}
                                >
                                    <Ionicons name="musical-notes" size={32} color={colors.textPrimary} />
                                </LinearGradient>
                                <Text style={styles.playlistName} numberOfLines={1}>
                                    {playlist.name}
                                </Text>
                                <Text style={styles.playlistCount}>
                                    {playlist.trackCount} tracks
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* All Tracks Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>All Tracks</Text>
                        <Text style={styles.trackCount}>{tracks.length} songs</Text>
                    </View>
                    {tracks.map((track, index) => (
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
    loadingText: {
        marginTop: spacing.md,
        color: colors.textSecondary,
        fontSize: fontSize.base,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
        paddingTop: spacing.md,
    },
    menuButton: {
        padding: spacing.xs,
    },
    headerTitle: {
        fontSize: fontSize.xl,
        fontWeight: '800',
        color: colors.textPrimary,
        letterSpacing: 1,
    },
    heartButton: {
        padding: spacing.xs,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    trackCount: {
        fontSize: fontSize.sm,
        color: colors.textTertiary,
    },
    playlistScroll: {
        paddingRight: spacing.md,
    },
    playlistCard: {
        width: 140,
        marginRight: spacing.md,
    },
    playlistGradient: {
        width: 140,
        height: 140,
        borderRadius: borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    playlistName: {
        fontSize: fontSize.base,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    playlistCount: {
        fontSize: fontSize.sm,
        color: colors.textTertiary,
    },
});
