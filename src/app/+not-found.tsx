import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '앗!' }} />
      <View className="flex-1 items-center justify-center gap-4 bg-surface-light p-6 dark:bg-surface-dark">
        <Text variant="title">페이지를 찾을 수 없어요.</Text>
        <Link href="/">
          <Text className="text-brand-600 dark:text-brand-300">홈으로 돌아가기</Text>
        </Link>
      </View>
    </>
  );
}
