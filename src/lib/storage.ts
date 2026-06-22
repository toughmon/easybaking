import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Thin, typed wrapper over AsyncStorage for ad-hoc JSON persistence.
 * (Zustand stores use AsyncStorage directly via `createJSONStorage`; this is for
 * one-off values outside of a store.)
 */
export const storage = {
  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
};
