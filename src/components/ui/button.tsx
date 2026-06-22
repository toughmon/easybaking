import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

const CONTAINER: Record<Variant, string> = {
  primary: 'bg-brand-500 active:bg-brand-600',
  secondary: 'bg-neutral-200 dark:bg-neutral-700 active:opacity-80',
  ghost: 'bg-transparent active:bg-neutral-100 dark:active:bg-neutral-800',
};

const LABEL: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-neutral-900 dark:text-neutral-50',
  ghost: 'text-brand-600 dark:text-brand-300',
};

interface Props extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: Variant;
  loading?: boolean;
  className?: string;
}

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  className,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={cn(
        'h-12 flex-row items-center justify-center rounded-2xl px-5',
        CONTAINER[variant],
        isDisabled && 'opacity-50',
        className,
      )}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#c97e1f'} />
      ) : (
        <Text className={cn('text-base font-semibold', LABEL[variant])}>{label}</Text>
      )}
    </Pressable>
  );
}
