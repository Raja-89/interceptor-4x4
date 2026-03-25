import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import * as SplashScreenExpo from 'expo-splash-screen';

import SplashScreen from './src/screens/SplashScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import StatsScreen from './src/screens/StatsScreen';
import ContactScreen from './src/screens/ContactScreen';
import Icon from './src/components/Icon';
import { colors } from './src/theme';

// Keep splash screen visible while loading
SplashScreenExpo.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true);
  const [appReady, setAppReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or any other resources here
        // For now, we'll use system fonts which look similar to Google Sans
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        await SplashScreenExpo.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appReady || showSplash) {
    return (
      <SafeAreaProvider>
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textTertiary,
            tabBarStyle: {
              backgroundColor: colors.white,
              borderTopColor: colors.border,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
          }}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{
              tabBarIcon: ({ color }) => <Icon name="home" size={26} color={color} />,
            }}
          />
          <Tab.Screen 
            name="Analyze" 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => <Icon name="search" size={26} color={color} />,
            }}
          />
          <Tab.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{
              tabBarIcon: ({ color }) => <Icon name="chat" size={26} color={color} />,
            }}
          />
          <Tab.Screen 
            name="Stats" 
            component={StatsScreen}
            options={{
              tabBarIcon: ({ color }) => <Icon name="chart" size={26} color={color} />,
            }}
          />
          <Tab.Screen 
            name="About" 
            component={ContactScreen}
            options={{
              tabBarIcon: ({ color }) => <Icon name="info" size={26} color={color} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

