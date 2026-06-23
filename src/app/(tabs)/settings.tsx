import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, ScrollView, TextInput, View, Text } from 'react-native';
import { z } from 'zod';

import { useFavoritesStore } from '@/features/favorites';
import { useSettingsStore, type ThemeMode } from '@/features/settings';
import { cn } from '@/utils/cn';

const profileSchema = z.object({
  bakerName: z
    .string()
    .trim()
    .min(1, '이름을 입력해 주세요.')
    .max(20, '20자 이하로 입력해 주세요.'),
});
type ProfileForm = z.infer<typeof profileSchema>;

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: '시스템' },
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
];

export default function SettingsScreen() {
  const bakerName = useSettingsStore((s) => s.bakerName);
  const setBakerName = useSettingsStore((s) => s.setBakerName);
  const themeMode = useSettingsStore((s) => s.themeMode);
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);
  const clearFavorites = useFavoritesStore((s) => s.clear);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { bakerName },
  });

  const onSubmit = (values: ProfileForm) => {
    setBakerName(values.bakerName);
    reset(values); // clears the dirty state after save
    Alert.alert('저장 완료', `${values.bakerName} 님, 반가워요!`);
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 16, gap: 24 }}>
        <Text variant="title">설정</Text>

        {/* Profile form — react-hook-form + zod validation */}
        <View>
          <Text variant="heading">프로필</Text>
          <View>
            <Text variant="caption">베이커 이름</Text>
            <Controller
              control={control}
              name="bakerName"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="예) 빵순이"
                  placeholderTextColor="#9ca3af"
                 
                />
              )}
            />
            {errors.bakerName && (
              <Text>{errors.bakerName.message}</Text>
            )}
            <Pressable label="저장" onPress={handleSubmit(onSubmit)} disabled={!isDirty} />
          </View>
        </View>

        {/* Theme preference */}
        <View>
          <Text variant="heading">화면 테마</Text>
          <View>
            {THEME_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => setThemeMode(opt.value)}
               >
                <Text
                 >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Danger zone */}
        <View>
          <Text variant="heading">데이터</Text>
          <Pressable
            label="즐겨찾기 전체 삭제"
            variant="secondary"
            onPress={() =>
              Alert.alert('즐겨찾기 삭제', '모든 즐겨찾기를 삭제할까요?', [
                { text: '취소', style: 'cancel' },
                { text: '삭제', style: 'destructive', onPress: () => clearFavorites() },
              ])
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
