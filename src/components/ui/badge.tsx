import { Text, View } from 'react-native';

import { cn } from '@/utils/cn';

type Tone = 'brand' | 'neutral' | 'success' | 'warning' | 'danger';

const TONE: Record<Tone, string> = {
  brand: 'bg-brand-100 dark:bg-brand-900',
  neutral: 'bg-neutral-200 dark:bg-neutral-700',
  success: 'bg-green-100 dark:bg-green-900',
  warning: 'bg-amber-100 dark:bg-amber-900',
  danger: 'bg-red-100 dark:bg-red-900',
};

const TONE_TEXT: Record<Tone, string> = {
  brand: 'text-brand-700 dark:text-brand-100',
  neutral: 'text-neutral-700 dark:text-neutral-200',
  success: 'text-green-700 dark:text-green-100',
  warning: 'text-amber-700 dark:text-amber-100',
  danger: 'text-red-700 dark:text-red-100',
};

interface Props {
  label: string;
  tone?: Tone;
  className?: string;
}

export function Badge({ label, tone = 'neutral', className }: Props) {
  return (
    <View className={cn('self-start rounded-full px-2.5 py-1', TONE[tone], className)}>
      <Text className={cn('text-xs font-semibold', TONE_TEXT[tone])}>{label}</Text>
    </View>
  );
}
