import { Link, Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '앗!' }} />
      <View>
        <Text variant="title">페이지를 찾을 수 없어요.</Text>
        <Link href="/">
          <Text>홈으로 돌아가기</Text>
        </Link>
      </View>
    </>
  );
}
