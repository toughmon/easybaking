import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { cn } from '@/utils/cn';

interface Props {
  children: ReactNode;
  className?: string;
  /** Which safe-area edges to inset. Defaults to top only (tabs handle bottom). */
  edges?: readonly Edge[];
  /** Disable the default horizontal padding. */
  padded?: boolean;
}

/** Base screen wrapper: full-bleed background + safe-area handling. */
export function Screen({ children, className, edges = ['top'], padded = true }: Props) {
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-surface-light dark:bg-surface-dark">
      <View className={cn('flex-1', padded && 'px-4', className)}>{children}</View>
    </SafeAreaView>
  );
}
