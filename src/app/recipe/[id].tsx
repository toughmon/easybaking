import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { ActivityIndicator, ScrollView, View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useRecipe } from '@/features/recipes';
import { useFavoritesStore } from '@/features/favorites';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: recipe, isLoading, isError } = useRecipe(id);
  const favorites = useFavoritesStore((s) => s.ids);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  const isFavorite = id ? favorites.includes(id) : false;

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (isError || !recipe) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-on-surface">레시피를 찾을 수 없어요.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header (Floating on Mobile) */}
      <View className="absolute top-0 w-full z-40 flex-row items-center justify-between px-margin-mobile py-4 pt-12 md:hidden">
        <Pressable onPress={() => router.back()} className="glass-card rounded-full p-2 flex items-center justify-center">
          <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Pressable onPress={() => toggleFavorite(id)} className="glass-card rounded-full p-2 flex items-center justify-center">
          <MaterialIcons name={isFavorite ? "bookmark" : "bookmark-border"} size={24} color="#ffffff" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-container-max mx-auto md:px-margin-desktop pb-32 md:pb-0">
          
          {/* Hero Section */}
          <View className="relative w-full h-[530px] md:h-[618px] md:mt-8 md:rounded-xl overflow-hidden">
            <Image 
              source={recipe.imageUrl} 
              className="absolute inset-0 w-full h-full" 
              contentFit="cover" 
            />
            {/* Gradient Overlay */}
            <View className="absolute inset-0 image-overlay-gradient" />
            
            <View className="absolute bottom-0 left-0 w-full p-margin-mobile md:p-12 flex-col items-start">
              <View className="flex-row gap-2 mb-4">
                <View className="px-3 py-1 bg-[#5a6578] rounded">
                  <Text className="text-white font-label-md text-label-md uppercase tracking-wider">{recipe.category}</Text>
                </View>
                <View className="px-3 py-1 bg-[#5a6578] rounded">
                  <Text className="text-white font-label-md text-label-md uppercase tracking-wider">
                    {recipe.difficulty === 'easy' ? 'Beginner' : recipe.difficulty === 'medium' ? 'Intermediate' : 'Advanced'}
                  </Text>
                </View>
              </View>
              <Text className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-4 max-w-3xl">
                {recipe.title}
              </Text>
              <Text className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-6 hidden md:flex">
                {recipe.summary}
              </Text>
              
              {/* Meta Info Glass Card */}
              <View className="glass-card rounded-xl p-4 md:p-6 flex-row flex-wrap gap-6 md:gap-12 w-full md:w-auto">
                <View>
                  <Text className="font-label-md text-label-md text-outline uppercase mb-1">Prep Time</Text>
                  <Text className="font-headline-md text-headline-md text-primary">{recipe.prepMinutes}m</Text>
                </View>
                <View>
                  <Text className="font-label-md text-label-md text-outline uppercase mb-1">Bake Time</Text>
                  <Text className="font-headline-md text-headline-md text-primary">
                    {Math.floor(recipe.bakeMinutes / 60) > 0 ? `${Math.floor(recipe.bakeMinutes / 60)}h ` : ''}
                    {recipe.bakeMinutes % 60 > 0 ? `${recipe.bakeMinutes % 60}m` : ''}
                  </Text>
                </View>
                <View>
                  <Text className="font-label-md text-label-md text-outline uppercase mb-1">Yields</Text>
                  <Text className="font-headline-md text-headline-md text-primary">{recipe.servings} Slices</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Content Grid */}
          <View className="flex-col md:flex-row-reverse gap-8 md:gap-gutter mt-12 px-margin-mobile md:px-0">
            
            {/* Main Content: Instructions (Right on desktop, Top on mobile) */}
            <View className="w-full md:flex-[2]">
              <View className="flex-row items-center justify-between mb-12">
                <Text className="font-headline-lg text-headline-md md:text-headline-lg text-primary">Method</Text>
                {/* Cook Mode Button */}
                <Pressable className="bg-primary px-6 py-3 rounded-full flex-row items-center gap-2 shadow-2xl active:scale-95">
                  <MaterialIcons name="restaurant-menu" size={20} color="#131313" />
                  <Text className="text-background font-label-md text-label-md uppercase tracking-widest">Cook Mode</Text>
                </Pressable>
              </View>

              <View className="gap-stack-xl relative">
                {/* Vertical Timeline Line */}
                <View className="absolute left-6 md:left-8 top-12 bottom-12 w-px bg-white/10 hidden md:flex" />

                {recipe.steps.map((step) => (
                  <View key={step.order} className="relative flex-col md:flex-row gap-6 md:gap-12">
                    <View className="md:w-24 relative z-10 flex-shrink-0">
                      <Text className="font-headline-xl text-headline-xl text-primary opacity-20">
                        {String(step.order).padStart(2, '0')}
                      </Text>
                    </View>
                    <View className="flex-1 gap-6">
                      <Text className="font-headline-md text-headline-md text-primary">Phase {step.order}</Text>
                      <Text className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                        {step.description}
                      </Text>
                      {step.durationMinutes && (
                        <View className="flex-row items-center gap-2">
                          <MaterialIcons name="schedule" size={16} color="#8e9192" />
                          <Text className="font-label-md text-label-md text-outline uppercase tracking-widest">
                            {step.durationMinutes} Minutes
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Sidebar: Ingredients & Tools (Left on desktop, Bottom on mobile) */}
            <View className="w-full md:flex-[1]">
              <View className="bg-surface-container-low rounded-xl p-6 md:p-8 ghost-outline">
                <View className="flex-row items-center justify-between mb-8">
                  <Text className="font-headline-lg text-headline-md md:text-headline-lg text-primary">Ingredients</Text>
                  <MaterialIcons name="scale" size={24} color="#8e9192" />
                </View>
                
                <View className="gap-6">
                  <View>
                    <Text className="font-label-md text-label-md text-outline uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                      Main Components
                    </Text>
                    <View className="gap-4">
                      {recipe.ingredients.map((ing, i) => (
                        <View key={i} className="flex-row items-start group">
                          <View className="relative flex items-center justify-center mt-1 mr-4">
                            <View className="w-5 h-5 rounded border border-outline-variant flex items-center justify-center">
                              {/* Checkbox Placeholder */}
                            </View>
                          </View>
                          <Text className="font-body-md text-body-md text-on-surface flex-1">
                            <Text className="font-bold">{ing.amount}</Text> {ing.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  );
}
