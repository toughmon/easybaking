import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'system' | 'light' | 'dark';

interface SettingsState {
  themeMode: ThemeMode;
  /** Display name shown on the profile/settings screen (set via the form). */
  bakerName: string;
  setThemeMode: (mode: ThemeMode) => void;
  setBakerName: (name: string) => void;
}

/** Persisted user preferences. */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      bakerName: '',
      setThemeMode: (themeMode) => set({ themeMode }),
      setBakerName: (bakerName) => set({ bakerName }),
    }),
    {
      name: 'easybaking.settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
