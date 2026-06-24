import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      {/* Header */}
      <View className="w-full bg-background z-40 border-b border-surface-container-high">
        <View className="flex-row items-center justify-between px-margin-mobile md:px-margin-desktop py-4 w-full">
          <Pressable className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high active:scale-95">
            <MaterialIcons name="menu" size={24} color="#8e9192" />
          </Pressable>
          <Text className="font-headline-md text-headline-md tracking-widest text-primary uppercase text-center flex-1 md:flex-none">
            EasyBaking
          </Text>
          <View className="flex-row items-center gap-4">
            {/* Desktop Nav Links */}
            <View className="hidden md:flex flex-row items-center gap-8 mr-8">
              <Text className="font-label-md text-label-md text-primary uppercase tracking-widest">Journal</Text>
              <Text className="font-label-md text-label-md text-outline uppercase tracking-widest">Recipes</Text>
              <Text className="font-label-md text-label-md text-outline uppercase tracking-widest">Masterclasses</Text>
            </View>
            <Pressable className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high active:scale-95">
              <MaterialIcons name="search" size={24} color="#8e9192" />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-md"
      >
        <View className="gap-stack-xl">
          {/* Hero Feature Card */}
          <Pressable onPress={() => router.push('/recipe/soft-milk-bread')} className="relative w-full h-[618px] md:h-[751px] rounded-[2px] overflow-hidden active:opacity-90">
            <Image 
              source="https://lh3.googleusercontent.com/aida-public/AB6AXuCUjV3LvMbLSBm1Yn_ZUGQPByoWVkNsU1WNOD6DlpprHuZdWw9E3pYYjsRscmQJTVSHRx4-Ma1P_TKKIrXqQoq4s7AH450zwRJoEC6OS1cgR2GvoJsPmo-jmMVv1WNsfoHUlRImgd078EVaTWEHA9p9GFXvL5jMUKG4WDhfVmeUdHz4s4kRHaABvIIiKsURkNUqQy1zDd8CADLiWx25oKaZPh9tV3gzdxtStRy6NV7TGefOkNdqrpj7vKAG8GYVy7Q-wjA9Ye4U8yHj" 
              className="absolute inset-0 w-full h-full" 
              contentFit="cover" 
            />
            <View className="absolute inset-0 image-overlay-gradient" />
            <View className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 w-full md:w-2/3 lg:w-1/2">
              <View className="gap-stack-sm">
                <View className="self-start border border-outline/30 px-3 py-1 bg-surface/20 rounded-[2px]">
                  <Text className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                    Masterclass
                  </Text>
                </View>
                <Text className="font-headline-xl text-headline-xl text-primary leading-tight mt-4">The Art of Sourdough</Text>
                <Text className="font-body-lg text-body-lg text-on-surface-variant mt-4">
                  Unlock the secrets of wild yeast fermentation with Chef Julian Moreau. A deep dive into hydration, scoring, and the perfect bake.
                </Text>
                <View className="pt-6 self-start">
                  <Pressable className="bg-primary px-8 py-4 rounded-[2px]">
                    <Text className="text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider">
                      Read Journal
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>

          {/* Trending Recipes Grid */}
          <View>
            <View className="flex-row justify-between items-end border-b border-surface-container-high pb-4 mb-stack-md">
              <Text className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Trending Library</Text>
              <Pressable className="flex-row items-center gap-2">
                <Text className="font-label-md text-label-md text-secondary uppercase tracking-widest">
                  View Archive
                </Text>
                <MaterialIcons name="arrow-forward" size={16} color="#ffb3ae" />
              </Pressable>
            </View>

            <View className="flex-col md:flex-row flex-wrap gap-gutter">
              {/* Recipe Card 1 */}
              <Pressable onPress={() => router.push('/recipe/classic-chocolate-chip-cookies')} className="w-full md:w-[31%] gap-4 active:scale-[0.98] transition-transform">
                <View className="relative w-full aspect-[3/4] overflow-hidden rounded-[2px] bg-surface-container-low">
                  <Image source="https://lh3.googleusercontent.com/aida-public/AB6AXuB3VU4iV5TdF2aYxJirmVpYxkqbFAOmeC83HLa-XShkAOGKLQZq9bHBcZv1vkw6hr5Dr41SZmn25_gYbO7xofDd_xgsd88UIuAT1yaI0TrWaXQGNfkfOGogVCbTO2iCNxPHo_G1_iubkTs5S2hBCfbgiox_SAsaz_4mNHOjPe5qkB_dbJPegt9Rv7Su9nCrWLjE24uXgvJlZ-wv8udceWa4Irq3kbKQGpTEiynpnNu9LiVcxm60w0DZADzWiY_d9nDVfP9khMuSDJor" className="w-full h-full opacity-90" contentFit="cover" />
                  <View className="absolute top-4 left-4 flex-row flex-wrap gap-2 z-10">
                    <View className="bg-surface-container-high px-3 py-1 rounded-[2px]">
                      <Text className="text-on-surface font-label-md text-label-md uppercase tracking-wider">Advanced</Text>
                    </View>
                    <View className="bg-surface-container-high px-3 py-1 rounded-[2px]">
                      <Text className="text-on-surface font-label-md text-label-md uppercase tracking-wider">Pastry</Text>
                    </View>
                  </View>
                  <View className="absolute bottom-4 right-4 z-10">
                    <Pressable className="bg-surface/80 p-2 rounded-full">
                      <MaterialIcons name="bookmark-border" size={24} color="#e5e2e1" />
                    </Pressable>
                  </View>
                </View>
                <View>
                  <Text className="font-headline-md text-headline-md text-primary mb-2 line-clamp-2">Laminated Viennoiserie Classics</Text>
                  <View className="flex-row items-center gap-6">
                    <View className="flex-row items-center gap-1.5">
                      <MaterialIcons name="schedule" size={16} color="#8e9192" />
                      <Text className="text-on-surface-variant font-caption text-caption">12h Prep</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                      <MaterialIcons name="bar-chart" size={16} color="#8e9192" />
                      <Text className="text-on-surface-variant font-caption text-caption">High Difficulty</Text>
                    </View>
                  </View>
                </View>
              </Pressable>

              {/* Recipe Card 2 */}
              <Pressable onPress={() => router.push('/recipe/plain-scone')} className="w-full md:w-[31%] gap-4 mt-0 lg:mt-stack-lg active:scale-[0.98] transition-transform">
                <View className="relative w-full aspect-[3/4] overflow-hidden rounded-[2px] bg-surface-container-low">
                  <Image source="https://lh3.googleusercontent.com/aida-public/AB6AXuDNa8p3qEyEG33uMXafTZ5krebdZtD-4e_BuuLdug9VtNbYb7PFTuTNLTY2iNyBhlHIndN8JWFgZa947vkcfkqCyYmuSRyWrlCUsL-vdqiKkkdftGv74JQaATHTxwZXmslqSrdwpBnTyYt5hqVjwSrFqIqKKi4ODP3a5PMRLWS_M4k5x6AN-Qi_-6GZDj1oZuPnw5QnXHk3LiSWjfo7TEuJ8_2025OPRD0YMtpNIiUHdkOM1Cv_UnmVYHXtD-wLUE9UIUuwtjxAhMB-" className="w-full h-full opacity-90" contentFit="cover" />
                  <View className="absolute top-4 left-4 flex-row flex-wrap gap-2 z-10">
                    <View className="bg-surface-container-high px-3 py-1 rounded-[2px]">
                      <Text className="text-on-surface font-label-md text-label-md uppercase tracking-wider">Seasonal</Text>
                    </View>
                  </View>
                  <View className="absolute bottom-4 right-4 z-10">
                    <Pressable className="bg-surface/80 p-2 rounded-full">
                      <MaterialIcons name="bookmark-border" size={24} color="#e5e2e1" />
                    </Pressable>
                  </View>
                </View>
                <View>
                  <Text className="font-headline-md text-headline-md text-primary mb-2 line-clamp-2">Rustic Galette with Autumn Berries</Text>
                  <View className="flex-row items-center gap-6">
                    <View className="flex-row items-center gap-1.5">
                      <MaterialIcons name="schedule" size={16} color="#8e9192" />
                      <Text className="text-on-surface-variant font-caption text-caption">2h Prep</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                      <MaterialIcons name="bar-chart" size={16} color="#8e9192" />
                      <Text className="text-on-surface-variant font-caption text-caption">Medium</Text>
                    </View>
                  </View>
                </View>
              </Pressable>

              {/* Recipe Card 3 */}
              <Pressable onPress={() => router.push('/recipe/basque-cheesecake')} className="w-full md:w-[31%] gap-4 active:scale-[0.98] transition-transform">
                <View className="relative w-full aspect-[3/4] overflow-hidden rounded-[2px] bg-surface-container-low">
                  <Image source="https://lh3.googleusercontent.com/aida-public/AB6AXuBkhMkFkZh_LNHfFpE_uJlnsSzW-GZ-yV0PXWKeKjMm2EnEHWKEMYJG8T-gSU8xNVIeqsIqOil_VSTPgDYm7tJUs5MRC_alyyoBoRHXdoYmsIQ43QlmmHoiEz6bh1tzDTJTCf7D0rgFHcLFf4nHrOYkj-5FdMT2bfes-QzXglPXbJhBcKSFNsYYP7A5X6lxhHNFQIUcvjfcBIuyLigC8_dlbIukwu02OpokrqQjM6uW72ed4nvzcp-JWAvxAjq7bTjHQymsil6EuBe1" className="w-full h-full opacity-90" contentFit="cover" />
                  <View className="absolute top-4 left-4 flex-row flex-wrap gap-2 z-10">
                    <View className="bg-surface-container-high px-3 py-1 rounded-[2px]">
                      <Text className="text-on-surface font-label-md text-label-md uppercase tracking-wider">Staples</Text>
                    </View>
                    <View className="bg-surface-container-high px-3 py-1 rounded-[2px]">
                      <Text className="text-on-surface font-label-md text-label-md uppercase tracking-wider">Vegan</Text>
                    </View>
                  </View>
                  <View className="absolute bottom-4 right-4 z-10">
                    <Pressable className="bg-surface/80 p-2 rounded-full">
                      <MaterialIcons name="bookmark-border" size={24} color="#e5e2e1" />
                    </Pressable>
                  </View>
                </View>
                <View>
                  <Text className="font-headline-md text-headline-md text-primary mb-2 line-clamp-2">New York Style Artisan Bagels</Text>
                  <View className="flex-row items-center gap-6">
                    <View className="flex-row items-center gap-1.5">
                      <MaterialIcons name="schedule" size={16} color="#8e9192" />
                      <Text className="text-on-surface-variant font-caption text-caption">4h Prep</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                      <MaterialIcons name="bar-chart" size={16} color="#8e9192" />
                      <Text className="text-on-surface-variant font-caption text-caption">Medium Difficulty</Text>
                    </View>
                  </View>
                </View>
              </Pressable>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
