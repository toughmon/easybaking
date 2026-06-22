import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Screen, Text } from '@/components/ui';

export default function AddScreen() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center gap-4">
        <Ionicons name="add-circle-outline" size={64} color="#c1c8c4" />
        <Text variant="heading" className="text-on-surface-variant">레시피 추가</Text>
        <Text variant="caption" className="text-center">
          나만의 레시피를 추가하는 기능이{'\n'}곧 출시됩니다.
        </Text>
      </View>
    </Screen>
  );
}
