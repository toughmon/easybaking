import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/utils/cn';

interface Props extends ViewProps {
  children: ReactNode;
  className?: string;
}

/** Elevated surface container. */
export function Card({ children, className, ...rest }: Props) {
  return (
    <View
      className={cn(
        'overflow-hidden rounded-2xl bg-surface-light-elevated dark:bg-surface-dark-elevated',
        'border border-black/5 dark:border-white/5',
        className,
      )}
      {...rest}>
      {children}
    </View>
  );
}
