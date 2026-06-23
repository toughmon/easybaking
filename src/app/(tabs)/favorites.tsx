import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';

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
    <SafeAreaView>
      <RecipeList
        recipes={favorites}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        emptyText="아직 즐겨찾기한 레시피가 없어요. ♥ 를 눌러 추가해 보세요."
        ListHeaderComponent={
          <View>
            <Text variant="title">즐겨찾기</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
