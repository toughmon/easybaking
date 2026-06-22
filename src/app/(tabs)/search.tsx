import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

import { Screen, Text } from '@/components/ui';
import { RecipeList, useCategories, useRecipes } from '@/features/recipes';
import { cn } from '@/utils/cn';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);

  const { data: categories } = useCategories();
  const { data, isLoading, isError, refetch } = useRecipes({ search, category });

  return (
    <Screen>
      <View className="gap-3 pt-2">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="레시피, 재료, 태그 검색"
          placeholderTextColor="#9ca3af"
          className="h-12 rounded-2xl bg-neutral-200 px-4 text-base text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}>
          <CategoryChip
            label="전체"
            active={category === undefined}
            onPress={() => setCategory(undefined)}
          />
          {categories?.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              active={category === c}
              onPress={() => setCategory(c)}
            />
          ))}
        </ScrollView>
      </View>

      <RecipeList
        recipes={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        emptyText="검색 결과가 없어요."
      />
    </Screen>
  );
}

function CategoryChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'h-9 justify-center rounded-full px-4',
        active ? 'bg-brand-500' : 'bg-neutral-200 dark:bg-neutral-800',
      )}>
      <Text
        className={cn(
          'text-sm font-medium',
          active ? 'text-white' : 'text-neutral-700 dark:text-neutral-300',
        )}>
        {label}
      </Text>
    </Pressable>
  );
}
