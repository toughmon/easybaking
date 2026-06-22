import { useColorScheme as useSystemColorScheme } from 'react-native';

import { useSettingsStore } from './store/settings.store';

/**
 * Resolves the effective color scheme by combining the user's preference with
 * the OS setting. Used by the root layout to drive both navigation chrome and
 * NativeWind's `dark:` variants.
 */
export function useResolvedScheme(): 'light' | 'dark' {
  const system = useSystemColorScheme();
  const mode = useSettingsStore((s) => s.themeMode);
  if (mode === 'system') return system === 'dark' ? 'dark' : 'light';
  return mode;
}
