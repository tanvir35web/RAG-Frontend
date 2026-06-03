import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

type AlertVariant = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const styles: Record<AlertVariant, string> = {
  error:   'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400',
  success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  info:    'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
};

export function Alert({ variant = 'error', children, onClose, className }: AlertProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-xl border text-sm animate-fade-up',
        styles[variant],
        className,
      )}
      role="alert"
    >
      <span className="flex-1">{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-none opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
