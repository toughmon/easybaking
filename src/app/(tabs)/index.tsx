import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { RecipeCard, useRecipes } from '@/features/recipes';
import { cn } from '@/utils/cn';

const CATEGORIES = ['전체', '쿠키', '스콘', '케이크', '빵', '구움과자'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const { data: recipes } = useRecipes();

  const featured = recipes?.[0];
  const curated = recipes?.slice(1, 4) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <Text className="text-[32px] font-bold tracking-tight text-primary leading-10">
            EasyBaking
          </Text>
          <Pressable hitSlop={8} onPress={() => router.push('/(tabs)/profile')}>
            <Ionicons name="person-circle-outline" size={32} color="#01261f" />
          </Pressable>
        </View>

        {/* ── Search bar (tap → search tab) ── */}
        <Pressable
          className="mx-5 mt-2 mb-6 flex-row items-center h-12 rounded-full bg-surface-container-lowest border border-outline-variant px-4 gap-3"
          onPress={() => router.push('/(tabs)/search')}>
          <Ionicons name="search-outline" size={20} color="#717976" />
          <Text className="text-base text-[#717976]">레시피, 재료 검색...</Text>
        </Pressable>

        {/* ── Category chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 20, paddingBottom: 16 }}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-5 py-2 active:opacity-80',
                activeCategory === cat
                  ? 'bg-primary-container'
                  : 'bg-surface-container-highest border border-transparent',
              )}>
              <Text
                className={cn(
                  'text-sm font-semibold tracking-wide',
                  activeCategory === cat ? 'text-on-primary' : 'text-primary-container',
                )}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Featured Masterclass ── */}
        {featured && (
          <View className="mb-10">
            <Text className="px-5 mb-4 text-2xl font-semibold tracking-tight text-primary">
              오늘의 마스터클래스
            </Text>
            <Link href={{ pathname: '/recipe/[id]', params: { id: featured.id } }} asChild>
              <Pressable className="mx-5 active:opacity-90">
                <View className="h-80 rounded-xl overflow-hidden">
                  <Image
                    source={featured.imageUrl}
                    className="absolute inset-0 w-full h-full"
                    contentFit="cover"
                    transition={300}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(1,38,31,0.92)']}
                    className="absolute inset-0"
                  />
                  <View className="absolute bottom-0 left-0 right-0 p-5 gap-2">
                    <View className="flex-row gap-2">
                      <View className="rounded bg-white/20 border border-white/30 px-2 py-0.5">
                        <Text className="text-xs text-white">{featured.category}</Text>
                      </View>
                      <View className="rounded bg-white/20 border border-white/30 px-2 py-0.5">
                        <Text className="text-xs text-white">{featured.difficulty === 'easy' ? '쉬움' : featured.difficulty === 'medium' ? '보통' : '어려움'}</Text>
                      </View>
                    </View>
                    <Text className="text-2xl font-bold text-white leading-8">
                      {featured.title}
                    </Text>
                    <Text className="text-sm text-surface-container-low" numberOfLines={2}>
                      {featured.summary}
                    </Text>
                    <View className="flex-row gap-4 mt-1">
                      <Text className="text-xs text-surface-container-low">
                        ⏱ 준비 {featured.prepMinutes}분 + 굽기 {featured.bakeMinutes}분
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </Link>
          </View>
        )}

        {/* ── Curated for You ── */}
        <View className="px-5">
          <View className="flex-row items-end justify-between pb-2 mb-4 border-b border-outline-variant">
            <Text className="text-2xl font-semibold tracking-tight text-primary">
              추천 레시피
            </Text>
            <Link href="/(tabs)/search" asChild>
              <Pressable>
                <Text className="text-sm font-semibold text-secondary">전체 보기</Text>
              </Pressable>
            </Link>
          </View>
          <View className="gap-4">
            {curated.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
