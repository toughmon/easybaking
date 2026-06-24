import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Background Image with Tonal Scrim */}
      <View className="absolute inset-0 z-0 w-full h-full">
        <Image 
          source="https://lh3.googleusercontent.com/aida-public/AB6AXuCQsErZ2wNBz6SdEa4-l-TnhAefawMH9MpS-MN6Qj6DgFiEkv9oIMwq3Xjgul2QGsrDHqh2gZOWC-vNeQTZzWBBZ5blIYsy4B53owUZL41sVu7vQylW9ATsaPqPwax--bMWIzhRKkrL5OsC8wCOTxyn92AEJSuReLxp-qPkI8LDmVuJ62TetghXeVl6LV16nDC_BVCLKxlXUV-fNOEgD3ZN-hxLEqYu0GCmPWcCU29K0CRUoFOjRVTz9xBSIKhT9TyInn0d8Csd_5Bq" 
          className="absolute inset-0 w-full h-full opacity-40" 
          contentFit="cover" 
        />
        <View className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </View>

      <SafeAreaView className="flex-1 items-center justify-center relative z-10 w-full">
        <View className="w-full max-w-md px-margin-mobile md:px-0 py-stack-lg">
          
          {/* Header / Logo */}
          <View className="items-center mb-stack-xl px-4">
            <Text className="font-headline-lg text-headline-lg-mobile md:text-headline-xl text-primary tracking-wider uppercase">
              EasyBaking
            </Text>
            <Text className="font-body-md text-body-md text-on-surface-variant mt-stack-sm tracking-wide">
              EasyBaking
            </Text>
          </View>

          {/* Login Form Card */}
          <View className="bg-surface-container-low border border-white/10 rounded-xl p-stack-lg shadow-2xl">
            <View className="gap-stack-md">
              
              {/* Email Input */}
              <View className={`border-b transition-colors duration-300 ${emailFocused ? 'border-secondary' : 'border-outline'}`}>
                <Text className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-2">
                  Email Address
                </Text>
                <View className="flex-row items-center pb-2">
                  <MaterialIcons name="mail" size={20} color="#8e9192" style={{ marginRight: 12 }} />
                  <TextInput
                    className="flex-1 p-0 text-on-surface font-body-lg text-body-lg"
                    placeholder="baker@example.com"
                    placeholderTextColor="#444748"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className={`border-b transition-colors duration-300 ${passwordFocused ? 'border-secondary' : 'border-outline'}`}>
                <Text className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-2">
                  Password
                </Text>
                <View className="flex-row items-center pb-2">
                  <MaterialIcons name="lock" size={20} color="#8e9192" style={{ marginRight: 12 }} />
                  <TextInput
                    className="flex-1 p-0 text-on-surface font-body-lg text-body-lg"
                    placeholder="••••••••"
                    placeholderTextColor="#444748"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} className="ml-2">
                    <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#8e9192" />
                  </Pressable>
                </View>
              </View>

              {/* Actions Container */}
              <View className="flex-row items-center justify-between pt-stack-sm">
                <Pressable className="flex-row items-center" onPress={() => setRememberMe(!rememberMe)}>
                  <View className={`h-4 w-4 rounded border flex items-center justify-center ${rememberMe ? 'bg-secondary border-secondary' : 'border-outline bg-transparent'}`}>
                    {rememberMe && <MaterialIcons name="check" size={12} color="#131313" />}
                  </View>
                  <Text className="ml-2 font-caption text-caption text-on-surface-variant">
                    Remember me
                  </Text>
                </Pressable>
                <Pressable>
                  <Text className="font-caption text-caption text-outline">
                    Forgot password?
                  </Text>
                </Pressable>
              </View>

              {/* Submit Button */}
              <View className="pt-stack-md">
                <Pressable 
                  className="w-full flex-row justify-center items-center py-4 px-6 rounded bg-primary shadow-2xl active:opacity-80"
                  onPress={() => router.replace('/(tabs)')}
                >
                  <Text className="text-on-primary font-label-md text-label-md uppercase tracking-widest">
                    Sign In
                  </Text>
                </Pressable>
              </View>
              
            </View>

            {/* Divider */}
            <View className="mt-stack-md relative">
              <View className="absolute inset-0 flex items-center justify-center">
                <View className="w-full border-t border-outline/30" />
              </View>
              <View className="relative flex-row justify-center">
                <Text className="px-2 bg-surface-container-low text-on-surface-variant font-caption text-caption">
                  Or continue with
                </Text>
              </View>
            </View>

            {/* Social Login */}
            <View className="mt-stack-md">
              <Pressable className="w-full flex-row items-center justify-center py-3 border border-white/10 rounded active:bg-surface-container-highest gap-3">
                <AntDesign name="google" size={18} color="#e5e2e1" />
                <Text className="font-label-md text-label-md text-on-surface uppercase tracking-wider mt-0.5">Google</Text>
              </Pressable>
            </View>

          </View>

          {/* Footer Links */}
          <View className="mt-stack-lg flex-row justify-center items-center">
            <Text className="font-caption text-caption text-on-surface-variant">
              Don't have an account? 
            </Text>
            <Pressable>
              <Text className="font-label-md text-label-md text-primary uppercase tracking-wider ml-2">
                Create Account
              </Text>
            </Pressable>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}
