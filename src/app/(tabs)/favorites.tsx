import { useMemo } from 'react';
import { View } from 'react-native';

import { Screen, Text } from '@/components/ui';
import { useFavoritesStore } from '@/features/favorites';
import { RecipeList, useRecipes } from '@/features/recipes';

export default function FavoritesScreen() {
  const favoriteIds = useFavoritesStore((s) => s.ids);
  const { data, isLoading, isError, refetch } = useRecipes();

  const favorites = useMemo(
    () => data?.filter((r) => favoriteIds.includes(r.id)),
    [data, favoriteIds],
  );

  return (
    <Screen>
      <RecipeList
        recipes={favorites}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        emptyText="아직 즐겨찾기한 레시피가 없어요. ♥ 를 눌러 추가해 보세요."
        ListHeaderComponent={
          <View className="mb-2">
            <Text variant="title">즐겨찾기</Text>
          </View>
        }
      />
    </Screen>
  );
}
