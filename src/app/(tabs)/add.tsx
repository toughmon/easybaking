import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, View, Text, TextInput, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddRecipeScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-background w-full z-50 flex-row items-center justify-between px-margin-mobile md:px-margin-desktop py-4">
        <Pressable className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low active:opacity-70">
          <MaterialIcons name="menu" size={24} color="#ffffff" />
        </Pressable>
        <Text className="font-headline-md text-headline-md tracking-widest text-primary uppercase text-center flex-1">
          L'ART DE CUIRE
        </Text>
        <Pressable className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low active:opacity-70">
          <MaterialIcons name="search" size={24} color="#ffffff" />
        </Pressable>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg"
        >
          {/* Title Section */}
          <View className="mb-stack-xl">
            <Text className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-2">
              Chronicle a Recipe
            </Text>
            <Text className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Document your culinary creation with precision. Every detail contributes to the final masterpiece.
            </Text>
          </View>

          {/* Form */}
          <View className="w-full">
            {/* Bento Layout for Basic Info */}
            <View className="flex-col md:flex-row gap-gutter mb-stack-xl items-start">
              {/* Left Column: Inputs */}
              <View className="flex-1 flex-col gap-stack-lg w-full">
                {/* Title Input */}
                <View>
                  <TextInput 
                    className="w-full bg-transparent border-b border-outline text-primary font-headline-lg-mobile md:text-headline-lg py-4 px-0 placeholder:text-surface-container-highest"
                    placeholder="Recipe Title"
                    placeholderTextColor="#353534"
                  />
                </View>
                {/* Description Textarea */}
                <View className="mt-stack-sm">
                  <TextInput 
                    multiline
                    className="w-full bg-transparent border-b border-outline text-on-surface font-body-lg py-4 px-0 min-h-[120px] placeholder:text-surface-container-highest"
                    placeholder="Describe the flavor profile, origin, and inspiration behind this dish..."
                    placeholderTextColor="#353534"
                    textAlignVertical="top"
                  />
                </View>
                {/* Categories / Tags */}
                <View className="mt-stack-md">
                  <Text className="font-label-md text-label-md text-outline uppercase tracking-widest mb-4">
                    Categorization
                  </Text>
                  <View className="flex-row flex-wrap gap-3">
                    <Pressable className="px-5 py-2 rounded bg-surface-container-high border border-transparent active:scale-95">
                      <Text className="text-primary font-label-md text-label-md uppercase tracking-widest">Pastry</Text>
                    </Pressable>
                    <Pressable className="px-5 py-2 rounded bg-surface border border-outline-variant hover:bg-surface-container-low active:scale-95">
                      <Text className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest">Bread</Text>
                    </Pressable>
                    <Pressable className="px-5 py-2 rounded bg-surface border border-outline-variant hover:bg-surface-container-low active:scale-95">
                      <Text className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest">Dessert</Text>
                    </Pressable>
                    <Pressable className="px-5 py-2 rounded bg-surface border border-outline border-dashed hover:border-primary active:scale-95 flex-row items-center gap-2">
                      <MaterialIcons name="add" size={16} color="#8e9192" />
                      <Text className="text-outline hover:text-primary font-label-md text-label-md uppercase tracking-widest">Custom</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* Right Column: Cover Image */}
              <View className="w-full md:w-[33%] mt-8 md:mt-0">
                <Pressable className="relative w-full aspect-[3/4] bg-surface-container-low border border-outline border-dashed rounded overflow-hidden flex flex-col items-center justify-center hover:bg-surface-container-high hover:border-primary-fixed-dim">
                  <View className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <MaterialIcons name="add-a-photo" size={48} color="#444748" className="mb-4" />
                    <Text className="font-label-md text-label-md text-outline-variant uppercase tracking-widest">Upload Hero Image</Text>
                    <Text className="font-caption text-caption text-outline-variant opacity-50 mt-2 text-center">High contrast, editorial lighting preferred.</Text>
                  </View>
                </Pressable>
              </View>
            </View>

            {/* Divider */}
            <View className="w-full h-[1px] bg-surface-container-high my-stack-xl" />

            {/* Steps Section */}
            <View className="mb-stack-xl">
              <View className="flex-row items-end justify-between mb-stack-lg">
                <Text className="font-headline-md text-headline-md text-primary">Method & Execution</Text>
                <Text className="font-label-md text-label-md text-outline uppercase tracking-widest">Chronological</Text>
              </View>

              <View className="flex-col gap-stack-lg">
                {/* Step 1 */}
                <View className="flex-col md:flex-row gap-gutter">
                  <View className="md:w-[8%] flex items-start md:items-center md:justify-center">
                    <Text className="font-headline-xl text-headline-xl text-surface-container-highest mt-2">01</Text>
                  </View>
                  <View className="w-full md:w-[32%]">
                    <Pressable className="w-full aspect-video md:aspect-[4/3] bg-surface-container-low border border-outline-variant border-dashed rounded flex flex-col items-center justify-center overflow-hidden hover:border-primary-fixed-dim">
                      <MaterialIcons name="image" size={24} color="#444748" />
                    </Pressable>
                  </View>
                  <View className="flex-1 flex-col mt-4 md:mt-0">
                    <TextInput 
                      className="w-full bg-transparent border-b border-surface-container-high text-primary font-headline-md py-2 px-0 mb-4 placeholder:text-surface-container-highest"
                      placeholder="Step Focus (e.g., Mixing the Dough)"
                      placeholderTextColor="#353534"
                    />
                    <TextInput 
                      multiline
                      className="w-full flex-1 bg-transparent border-b border-surface-container-high text-on-surface-variant font-body-md py-2 px-0 min-h-[100px] placeholder:text-surface-container-highest"
                      placeholder="Detail the exact technique, sensory cues, and timing required for this stage..."
                      placeholderTextColor="#353534"
                      textAlignVertical="top"
                    />
                  </View>
                </View>

                {/* Step 2 */}
                <View className="flex-col md:flex-row gap-gutter">
                  <View className="md:w-[8%] flex items-start md:items-center md:justify-center">
                    <Text className="font-headline-xl text-headline-xl text-surface-container-highest mt-2">02</Text>
                  </View>
                  <View className="w-full md:w-[32%]">
                    <Pressable className="w-full aspect-video md:aspect-[4/3] bg-surface-container-low border border-outline-variant border-dashed rounded flex flex-col items-center justify-center overflow-hidden hover:border-primary-fixed-dim">
                      <MaterialIcons name="image" size={24} color="#444748" />
                    </Pressable>
                  </View>
                  <View className="flex-1 flex-col mt-4 md:mt-0">
                    <TextInput 
                      className="w-full bg-transparent border-b border-surface-container-high text-primary font-headline-md py-2 px-0 mb-4 placeholder:text-surface-container-highest"
                      placeholder="Step Focus (e.g., Lamination)"
                      placeholderTextColor="#353534"
                    />
                    <TextInput 
                      multiline
                      className="w-full flex-1 bg-transparent border-b border-surface-container-high text-on-surface-variant font-body-md py-2 px-0 min-h-[100px] placeholder:text-surface-container-highest"
                      placeholder="Detail the exact technique, sensory cues, and timing required for this stage..."
                      placeholderTextColor="#353534"
                      textAlignVertical="top"
                    />
                  </View>
                </View>

                {/* Add Step Button */}
                <View className="flex-col md:flex-row gap-gutter mt-stack-md">
                  <View className="hidden md:flex md:w-[8%]" />
                  <View className="hidden md:flex md:w-[32%]" />
                  <View className="flex-1">
                    <Pressable className="w-full py-6 border border-outline-variant border-dashed rounded flex-row items-center justify-center gap-3 active:scale-95 hover:bg-surface-container-lowest hover:border-primary">
                      <MaterialIcons name="add-circle" size={24} color="#444748" />
                      <Text className="text-outline-variant font-label-md text-label-md uppercase tracking-widest">Append Next Phase</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            {/* Submit Section */}
            <View className="flex-row justify-end mt-stack-xl pt-stack-lg border-t border-surface-container-high">
              <Pressable className="px-8 py-4 mr-4 justify-center">
                <Text className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest">Save Draft</Text>
              </Pressable>
              <Pressable className="bg-primary px-12 py-4 shadow-2xl active:scale-95 hover:bg-primary-fixed-dim rounded justify-center">
                <Text className="text-on-primary font-label-md text-label-md uppercase tracking-widest">Publish Recipe</Text>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
