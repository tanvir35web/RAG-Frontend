import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'violet';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  default:  'bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-zinc-400',
  success:  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning:  'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  error:    'bg-red-500/10 text-red-600 dark:text-red-400',
  violet:   'bg-violet-500/10 text-violet-600 dark:text-violet-300',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full',
        'text-xs font-semibold',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
