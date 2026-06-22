import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { cn } from '@/utils/cn';

export default function LoginScreen() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View className="flex-1 items-center justify-center px-5 py-12">
              <View className="w-full max-w-[400px] gap-12">

                {/* Brand Header */}
                <View className="items-center gap-2">
                  <Text className="text-4xl font-bold tracking-tight text-primary-container">
                    EasyBaking
                  </Text>
                  <Text className="text-base text-color-secondary">
                    Sign in to your kitchen
                  </Text>
                </View>

                {/* Login Form */}
                <View className="gap-6">

                  {/* Email */}
                  <View className="gap-2">
                    <Text className="text-sm font-semibold tracking-widest text-on-surface-variant">
                      EMAIL
                    </Text>
                    <TextInput
                      placeholder="Enter your email address"
                      placeholderTextColor="#717976"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      className={cn(
                        'h-12 rounded-lg bg-surface-container-low px-4 text-base text-on-surface',
                        'border',
                        emailFocused ? 'border-primary-container' : 'border-outline-variant',
                      )}
                    />
                  </View>

                  {/* Password */}
                  <View className="gap-2">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm font-semibold tracking-widest text-on-surface-variant">
                        PASSWORD
                      </Text>
                      <Pressable hitSlop={8}>
                        <Text className="text-xs text-primary-container">
                          Forgot Password?
                        </Text>
                      </Pressable>
                    </View>
                    <TextInput
                      placeholder="Enter your password"
                      placeholderTextColor="#717976"
                      secureTextEntry
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className={cn(
                        'h-12 rounded-lg bg-surface-container-low px-4 text-base text-on-surface',
                        'border',
                        passwordFocused ? 'border-primary-container' : 'border-outline-variant',
                      )}
                    />
                  </View>

                  {/* Sign In Button */}
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.replace('/(tabs)')}
                    className="mt-2 h-12 items-center justify-center rounded-lg bg-primary-container active:opacity-75">
                    <Text className="text-sm font-semibold tracking-widest text-on-primary">
                      SIGN IN
                    </Text>
                  </Pressable>
                </View>

                {/* Footer */}
                <View className="flex-row items-center justify-center gap-1">
                  <Text className="text-base text-color-secondary">
                    {"Don't have an account?"}
                  </Text>
                  <Pressable hitSlop={8}>
                    <Text className="text-sm font-semibold text-primary-container">
                      Sign Up
                    </Text>
                  </Pressable>
                </View>

              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
