import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
  ids: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
}

/**
 * Persisted set of favorited recipe ids. Rehydrates from AsyncStorage on launch.
 * In components, prefer a selector for reactivity, e.g.
 *   const fav = useFavoritesStore((s) => s.ids.includes(id));
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      isFavorite: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    {
      name: 'easybaking.favorites',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
