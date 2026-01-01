import 'react-native-reanimated';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlayerProvider } from './src/context/PlayerContext';
import { colors } from './src/theme';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';
import LikedSongsScreen from './src/screens/LikedSongsScreen';
import NowPlayingScreen from './src/screens/NowPlayingScreen';

// Components
import PlayerBar from './src/components/PlayerBar';
import CustomDrawer from './src/components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Custom dark theme for navigation
const DarkTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.accent,
        background: colors.bgPrimary,
        card: colors.bgSecondary,
        text: colors.textPrimary,
        border: 'rgba(255, 255, 255, 0.1)',
    },
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={errorStyles.container}>
                    <Text style={errorStyles.text}>Something went wrong</Text>
                    <Text style={errorStyles.subtext}>{this.state.error?.message}</Text>
                </View>
            );
        }
        return this.props.children;
    }
}

const errorStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: '600',
    },
    subtext: {
        color: colors.textSecondary,
        fontSize: 14,
        marginTop: 10,
    },
});

// Stack Navigator for main content
function MainStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.bgSecondary,
                },
                headerTintColor: colors.textPrimary,
                headerTitleStyle: {
                    fontWeight: '600',
                },
                contentStyle: {
                    backgroundColor: colors.bgPrimary,
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Playlist"
                component={PlaylistScreen}
                options={({ route }) => ({
                    title: route.params?.name || 'Playlist',
                })}
            />
            <Stack.Screen
                name="LikedSongs"
                component={LikedSongsScreen}
                options={{ title: 'Liked Songs' }}
            />
            <Stack.Screen
                name="NowPlaying"
                component={NowPlayingScreen}
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    );
}

// Drawer Navigator with responsive options
function DrawerNavigator() {
    const [screenWidth, setScreenWidth] = React.useState(
        require('react-native').Dimensions.get('window').width
    );

    React.useEffect(() => {
        const subscription = require('react-native').Dimensions.addEventListener(
            'change',
            ({ window }) => setScreenWidth(window.width)
        );
        return () => subscription?.remove();
    }, []);

    // Use collapsible drawer on narrow screens (mobile), permanent on wide screens (desktop)
    const drawerType = screenWidth > 768 ? 'permanent' : 'front';

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.bgSecondary,
                },
                headerTintColor: colors.textPrimary,
                drawerStyle: {
                    backgroundColor: colors.bgSecondary,
                    width: Math.min(280, screenWidth * 0.8),
                },
                drawerActiveBackgroundColor: 'rgba(102, 126, 234, 0.2)',
                drawerActiveTintColor: colors.accent,
                drawerInactiveTintColor: colors.textSecondary,
                drawerType: drawerType,
            }}
        >
            <Drawer.Screen
                name="MainStack"
                component={MainStack}
                options={{
                    title: 'ASH Player',
                    headerShown: true,
                }}
            />
        </Drawer.Navigator>
    );
}

// Main App Component
export default function App() {
    return (
        <ErrorBoundary>
            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
                    <PlayerProvider>
                        <NavigationContainer theme={DarkTheme}>
                            <StatusBar style="light" />
                            <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
                                <DrawerNavigator />
                                <PlayerBar />
                            </View>
                        </NavigationContainer>
                    </PlayerProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </ErrorBoundary>
    );
}
