import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Badge, Card, Text } from '@/components/ui';
import { FavoriteButton } from '@/features/favorites/components/favorite-button';
import type { RecipeSummary } from '../types';
import { DIFFICULTY_META, formatTotalTime } from '../utils';

interface Props {
  recipe: RecipeSummary;
}

export function RecipeCard({ recipe }: Props) {
  const difficulty = DIFFICULTY_META[recipe.difficulty];

  return (
    <Link href={{ pathname: '/recipe/[id]', params: { id: recipe.id } }} asChild>
      <Pressable accessibilityRole="button" className="active:opacity-90">
        <Card>
          <View>
            <Image
              source={recipe.imageUrl}
              className="h-44 w-full"
              contentFit="cover"
              transition={200}
            />
            <FavoriteButton recipeId={recipe.id} className="absolute right-3 top-3" />
          </View>

          <View className="gap-2 p-4">
            <View className="flex-row items-center gap-2">
              <Badge label={recipe.category} tone="brand" />
              <Badge label={difficulty.label} tone={difficulty.tone} />
            </View>

            <Text variant="heading" numberOfLines={1}>
              {recipe.title}
            </Text>
            <Text variant="caption" numberOfLines={2}>
              {recipe.summary}
            </Text>

            <Text variant="caption" className="mt-1">
              ⏱ 총 {formatTotalTime(recipe.prepMinutes, recipe.bakeMinutes)}
            </Text>
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}
