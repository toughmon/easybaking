import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Register third-party components so they accept the Tailwind `className` prop.
 * Core RN components (View, Text, ScrollView, FlatList…) are supported out of the
 * box; non-core ones must be registered once. Import this module a single time at
 * the app root (see src/providers/app-providers.tsx).
 */
cssInterop(Image, { className: 'style' });
cssInterop(SafeAreaView, { className: 'style' });
cssInterop(LinearGradient, { className: 'style' });
