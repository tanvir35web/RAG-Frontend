import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    'bg-violet-600 hover:bg-violet-500 active:bg-violet-700',
    'text-white shadow-lg shadow-violet-600/20',
    'disabled:bg-violet-600/40 disabled:shadow-none',
  ].join(' '),
  secondary: [
    'bg-white dark:bg-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.1]',
    'text-gray-700 dark:text-zinc-200',
    'border border-gray-200 dark:border-white/[0.08]',
    'disabled:opacity-40',
  ].join(' '),
  ghost: [
    'bg-transparent hover:bg-gray-100 dark:hover:bg-white/[0.06]',
    'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100',
    'disabled:opacity-40',
  ].join(' '),
  danger: [
    'bg-red-500/10 hover:bg-red-500/20',
    'text-red-500 dark:text-red-400',
    'border border-red-500/20',
    'disabled:opacity-40',
  ].join(' '),
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
  md: 'px-4 py-2 text-sm gap-2 rounded-xl',
  lg: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-150 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 flex-none"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : leftIcon ? (
        <span className="flex-none">{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && !loading && <span className="flex-none">{rightIcon}</span>}
    </button>
  );
}
