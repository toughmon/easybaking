import { Text as RNText, type TextProps } from 'react-native';

import { cn } from '@/utils/cn';

type Variant = 'title' | 'heading' | 'subtitle' | 'body' | 'caption';

const VARIANT_CLASS: Record<Variant, string> = {
  title: 'text-3xl font-bold text-neutral-900 dark:text-neutral-50',
  heading: 'text-xl font-semibold text-neutral-900 dark:text-neutral-50',
  subtitle: 'text-base font-medium text-neutral-700 dark:text-neutral-300',
  body: 'text-base text-neutral-800 dark:text-neutral-200',
  caption: 'text-sm text-neutral-500 dark:text-neutral-400',
};

interface Props extends TextProps {
  variant?: Variant;
  className?: string;
}

/** Themed text primitive. Defaults to `body`; override styling via className. */
export function Text({ variant = 'body', className, ...rest }: Props) {
  return <RNText className={cn(VARIANT_CLASS[variant], className)} {...rest} />;
}
