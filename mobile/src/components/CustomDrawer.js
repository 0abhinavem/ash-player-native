import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const playlists = [
    { id: 'chill-vibes', name: 'Chill Vibes', icon: 'musical-notes' },
    { id: 'workout-mix', name: 'Workout Mix', icon: 'barbell' },
    { id: 'study-session', name: 'Study Session', icon: 'book' },
    { id: 'party-anthems', name: 'Party Anthems', icon: 'sparkles' },
];

export default function CustomDrawer({ navigation }) {
    const navigateToPlaylist = (playlist) => {
        navigation.navigate('MainStack', {
            screen: 'Playlist',
            params: { id: playlist.id, name: playlist.name },
        });
    };

    const navigateToHome = () => {
        navigation.navigate('MainStack', { screen: 'Home' });
    };

    const navigateToLikedSongs = () => {
        navigation.navigate('MainStack', { screen: 'LikedSongs' });
    };

    return (
        <DrawerContentScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {/* User Profile */}
            <View style={styles.profileSection}>
                <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    style={styles.avatar}
                >
                    <Ionicons name="person" size={32} color={colors.textPrimary} />
                </LinearGradient>
                <View style={styles.profileInfo}>
                    <Text style={styles.userName}>Music Lover</Text>
                    <Text style={styles.userEmail}>user@ashplayer.com</Text>
                </View>
            </View>

            {/* Navigation Items */}
            <View style={styles.section}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={navigateToHome}
                >
                    <Ionicons name="home" size={22} color={colors.accent} />
                    <Text style={[styles.navText, styles.activeText]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={navigateToLikedSongs}
                >
                    <Ionicons name="heart" size={22} color={colors.danger} />
                    <Text style={styles.navText}>Liked Songs</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="time" size={22} color={colors.textSecondary} />
                    <Text style={styles.navText}>Recently Played</Text>
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Playlists */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>YOUR PLAYLISTS</Text>
                {playlists.map((playlist) => (
                    <TouchableOpacity
                        key={playlist.id}
                        style={styles.playlistItem}
                        onPress={() => navigateToPlaylist(playlist)}
                    >
                        <View style={styles.playlistIcon}>
                            <Ionicons name={playlist.icon} size={18} color={colors.accent} />
                        </View>
                        <Text style={styles.playlistName}>{playlist.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Settings */}
            <View style={styles.section}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="settings" size={22} color={colors.textSecondary} />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="information-circle" size={22} color={colors.textSecondary} />
                    <Text style={styles.navText}>About</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>ASH Player v1.0.0</Text>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgSecondary,
    },
    content: {
        paddingTop: spacing.xl,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        paddingTop: 0,
        marginBottom: spacing.md,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 2,
    },
    userEmail: {
        fontSize: fontSize.sm,
        color: colors.textTertiary,
    },
    section: {
        paddingHorizontal: spacing.md,
        marginBottom: spacing.sm,
    },
    sectionTitle: {
        fontSize: fontSize.xs,
        fontWeight: '600',
        color: colors.textTertiary,
        letterSpacing: 1,
        marginBottom: spacing.sm,
        marginLeft: spacing.sm,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.sm,
        borderRadius: borderRadius.md,
        marginBottom: 4,
    },
    navText: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        marginLeft: spacing.md,
        fontWeight: '500',
    },
    activeText: {
        color: colors.accent,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        marginHorizontal: spacing.lg,
        marginVertical: spacing.md,
    },
    playlistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.sm,
        borderRadius: borderRadius.md,
        marginBottom: 4,
    },
    playlistIcon: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.sm,
        backgroundColor: 'rgba(102, 126, 234, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playlistName: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        marginLeft: spacing.md,
        fontWeight: '500',
    },
    footer: {
        padding: spacing.lg,
        alignItems: 'center',
    },
    footerText: {
        fontSize: fontSize.xs,
        color: colors.textTertiary,
    },
});
