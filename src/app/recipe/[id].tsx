import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { Badge, Card, Screen, Text } from '@/components/ui';
import { FavoriteButton } from '@/features/favorites';
import { DIFFICULTY_META, formatTotalTime, useRecipe } from '@/features/recipes';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: recipe, isLoading, isError } = useRecipe(id);

  if (isLoading) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#c97e1f" />
        </View>
      </Screen>
    );
  }

  if (isError || !recipe) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text variant="subtitle">레시피를 찾을 수 없어요.</Text>
        </View>
      </Screen>
    );
  }

  const difficulty = DIFFICULTY_META[recipe.difficulty];

  return (
    <>
      <Stack.Screen options={{ title: recipe.title }} />
      <ScrollView className="flex-1 bg-surface-light dark:bg-surface-dark" showsVerticalScrollIndicator={false}>
        <View>
          <Image source={recipe.imageUrl} className="h-64 w-full" contentFit="cover" transition={200} />
          <FavoriteButton recipeId={recipe.id} className="absolute right-4 top-4 h-12 w-12" size={28} />
        </View>

        <View className="gap-5 p-4">
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Badge label={recipe.category} tone="brand" />
              <Badge label={difficulty.label} tone={difficulty.tone} />
            </View>
            <Text variant="title">{recipe.title}</Text>
            <Text variant="body" className="text-neutral-600 dark:text-neutral-400">
              {recipe.summary}
            </Text>
          </View>

          {/* Meta info */}
          <Card className="flex-row justify-around p-4">
            <Info label="준비" value={`${recipe.prepMinutes}분`} />
            <Info label="굽기" value={`${recipe.bakeMinutes}분`} />
            <Info label="총 시간" value={formatTotalTime(recipe.prepMinutes, recipe.bakeMinutes)} />
            <Info label="분량" value={`${recipe.servings}개`} />
          </Card>

          {/* Ingredients */}
          <View className="gap-3">
            <Text variant="heading">재료</Text>
            <Card className="p-4">
              {recipe.ingredients.map((ing, i) => (
                <View
                  key={ing.name}
                  className={i > 0 ? 'flex-row justify-between border-t border-black/5 py-2.5 dark:border-white/5' : 'flex-row justify-between pb-2.5'}>
                  <Text variant="body">{ing.name}</Text>
                  <Text variant="body" className="text-neutral-500 dark:text-neutral-400">
                    {ing.amount}
                  </Text>
                </View>
              ))}
            </Card>
          </View>

          {/* Steps */}
          <View className="gap-3 pb-8">
            <Text variant="heading">만드는 법</Text>
            {recipe.steps.map((step) => (
              <View key={step.order} className="flex-row gap-3">
                <View className="h-8 w-8 items-center justify-center rounded-full bg-brand-500">
                  <Text className="font-bold text-white">{step.order}</Text>
                </View>
                <View className="flex-1 gap-1">
                  <Text variant="body">{step.description}</Text>
                  {step.durationMinutes != null && (
                    <Text variant="caption">약 {step.durationMinutes}분</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View className="items-center gap-1">
      <Text variant="caption">{label}</Text>
      <Text variant="subtitle">{value}</Text>
    </View>
  );
}
