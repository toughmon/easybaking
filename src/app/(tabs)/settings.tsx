import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, ScrollView, TextInput, View } from 'react-native';
import { z } from 'zod';

import { Button, Card, Screen, Text } from '@/components/ui';
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
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 16, gap: 24 }}>
        <Text variant="title">설정</Text>

        {/* Profile form — react-hook-form + zod validation */}
        <View className="gap-2">
          <Text variant="heading">프로필</Text>
          <Card className="gap-3 p-4">
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
                  className="h-12 rounded-xl bg-neutral-100 px-4 text-base text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                />
              )}
            />
            {errors.bakerName && (
              <Text className="text-sm text-red-500">{errors.bakerName.message}</Text>
            )}
            <Button label="저장" onPress={handleSubmit(onSubmit)} disabled={!isDirty} />
          </Card>
        </View>

        {/* Theme preference */}
        <View className="gap-2">
          <Text variant="heading">화면 테마</Text>
          <View className="flex-row gap-2">
            {THEME_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => setThemeMode(opt.value)}
                className={cn(
                  'h-11 flex-1 items-center justify-center rounded-xl',
                  themeMode === opt.value
                    ? 'bg-brand-500'
                    : 'bg-neutral-200 dark:bg-neutral-800',
                )}>
                <Text
                  className={cn(
                    'font-medium',
                    themeMode === opt.value
                      ? 'text-white'
                      : 'text-neutral-700 dark:text-neutral-300',
                  )}>
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Danger zone */}
        <View className="gap-2">
          <Text variant="heading">데이터</Text>
          <Button
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
    </Screen>
  );
}
