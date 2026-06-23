import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View, Text } from 'react-native';

import { useFavoritesStore } from '@/features/favorites';
import { useSettingsStore } from '@/features/settings';

export default function ProfileScreen() {
  const bakerName = useSettingsStore((s) => s.bakerName);
  const favoriteCount = useFavoritesStore((s) => s.ids.length);

  return (
    <SafeAreaView>
      <View>

        {/* Avatar + Name */}
        <View>
          <View>
            <Ionicons name="person" size={40} color="#01261f" />
          </View>
          <Text variant="heading">
            {bakerName || '베이커'}
          </Text>
        </View>

        {/* Stats row */}
        <View>
          <View>
            <Text variant="heading">{favoriteCount}</Text>
            <Text variant="caption">즐겨찾기</Text>
          </View>
          <View />
          <View>
            <Text variant="heading">0</Text>
            <Text variant="caption">내 레시피</Text>
          </View>
        </View>

        {/* Menu items */}
        <View>
          <MenuItem icon="heart-outline" label="즐겨찾기" onPress={() => {}} />
          <MenuItem icon="settings-outline" label="설정" onPress={() => router.push('/(tabs)/settings' as never)} />
          <MenuItem icon="log-out-outline" label="로그아웃" onPress={() => router.replace('/login')} />
        </View>

      </View>
    </SafeAreaView>
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
     >
      <Ionicons name={icon} size={22} color="#01261f" />
      <Text variant="body">{label}</Text>
      <View />
      <Ionicons name="chevron-forward" size={18} color="#c1c8c4" />
    </Pressable>
  );
}
