import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Screen, Text } from '@/components/ui';
import { useFavoritesStore } from '@/features/favorites';
import { useSettingsStore } from '@/features/settings';

export default function ProfileScreen() {
  const bakerName = useSettingsStore((s) => s.bakerName);
  const favoriteCount = useFavoritesStore((s) => s.ids.length);

  return (
    <Screen>
      <View className="flex-1 gap-6 pt-4">

        {/* Avatar + Name */}
        <View className="items-center gap-3 py-6">
          <View className="h-20 w-20 rounded-full bg-surface-container-highest items-center justify-center">
            <Ionicons name="person" size={40} color="#01261f" />
          </View>
          <Text variant="heading">
            {bakerName || '베이커'}
          </Text>
        </View>

        {/* Stats row */}
        <View className="flex-row justify-around rounded-2xl bg-surface-container p-5">
          <View className="items-center gap-1">
            <Text variant="heading">{favoriteCount}</Text>
            <Text variant="caption">즐겨찾기</Text>
          </View>
          <View className="w-px bg-outline-variant" />
          <View className="items-center gap-1">
            <Text variant="heading">0</Text>
            <Text variant="caption">내 레시피</Text>
          </View>
        </View>

        {/* Menu items */}
        <View className="gap-1">
          <MenuItem icon="heart-outline" label="즐겨찾기" onPress={() => {}} />
          <MenuItem icon="settings-outline" label="설정" onPress={() => router.push('/(tabs)/settings' as never)} />
          <MenuItem icon="log-out-outline" label="로그아웃" onPress={() => router.replace('/login')} />
        </View>

      </View>
    </Screen>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 rounded-xl px-4 py-4 active:bg-surface-container">
      <Ionicons name={icon} size={22} color="#01261f" />
      <Text variant="body">{label}</Text>
      <View className="flex-1" />
      <Ionicons name="chevron-forward" size={18} color="#c1c8c4" />
    </Pressable>
  );
}
