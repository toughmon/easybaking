import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View, Text } from 'react-native';

import { RecipeList, useCategories, useRecipes } from '@/features/recipes';
import { cn } from '@/utils/cn';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);

  const { data: categories } = useCategories();
  const { data, isLoading, isError, refetch } = useRecipes({ search, category });

  return (
    <SafeAreaView>
      <View>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="레시피, 재료, 태그 검색"
          placeholderTextColor="#9ca3af"
         
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
    </SafeAreaView>
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
     >
      <Text
       >
        {label}
      </Text>
    </Pressable>
  );
}
