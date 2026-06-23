import type { ReactElement } from 'react';
import { ActivityIndicator, FlatList, View, Text, Pressable } from 'react-native';

import type { RecipeSummary } from '../types';
import { RecipeCard } from './recipe-card';

interface Props {
  recipes: RecipeSummary[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  emptyText?: string;
  ListHeaderComponent?: ReactElement;
}

/**
 * Presentational list with built-in loading / error / empty states.
 * It is data-source agnostic — feed it the result of any query hook.
 */
export function RecipeList({
  recipes,
  isLoading,
  isError,
  onRetry,
  emptyText = '레시피가 없습니다.',
  ListHeaderComponent,
}: Props) {
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#c97e1f" />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text variant="subtitle">불러오는 중 문제가 발생했어요.</Text>
        {onRetry && <Pressable label="다시 시도" variant="secondary" onPress={onRetry} />}
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={() => <View />}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View>
          <Text variant="subtitle">{emptyText}</Text>
        </View>
      }
    />
  );
}
