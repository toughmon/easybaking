import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, View, Text } from 'react-native';

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
      <Pressable accessibilityRole="button">
        <View>
          <View>
            <Image
              source={recipe.imageUrl}
             
              contentFit="cover"
              transition={200}
            />
            <FavoriteButton recipeId={recipe.id} />
          </View>

          <View>
            <View>
              <View label={recipe.category} tone="brand" />
              <View label={difficulty.label} tone={difficulty.tone} />
            </View>

            <Text variant="heading" numberOfLines={1}>
              {recipe.title}
            </Text>
            <Text variant="caption" numberOfLines={2}>
              {recipe.summary}
            </Text>

            <Text variant="caption">
              ⏱ 총 {formatTotalTime(recipe.prepMinutes, recipe.bakeMinutes)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
