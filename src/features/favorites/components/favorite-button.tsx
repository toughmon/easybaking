import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import { cn } from '@/utils/cn';
import { useFavoritesStore } from '../store/favorites.store';

interface Props {
  recipeId: string;
  size?: number;
  className?: string;
}

/** Heart toggle bound to the persisted favorites store. */
export function FavoriteButton({ recipeId, size = 24, className }: Props) {
  // Selector subscription -> re-renders only when THIS id's membership changes.
  const isFavorite = useFavoritesStore((s) => s.ids.includes(recipeId));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      hitSlop={8}
      onPress={() => toggle(recipeId)}
      className={cn('h-10 w-10 items-center justify-center rounded-full bg-black/20', className)}>
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={isFavorite ? '#ef4444' : '#ffffff'}
      />
    </Pressable>
  );
}
