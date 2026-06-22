import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useResolvedScheme } from '@/features/settings';

export default function TabsLayout() {
  const scheme = useResolvedScheme();
  const isDark = scheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1a3c34',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#5a5f62',
        tabBarStyle: {
          backgroundColor: isDark ? '#15110c' : '#ffffff',
          borderTopColor: isDark ? '#27272a' : '#c1c8c4',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      {/* Hidden tabs — accessible as routes but not shown in the tab bar */}
      <Tabs.Screen name="favorites" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}
