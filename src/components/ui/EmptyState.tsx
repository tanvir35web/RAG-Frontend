import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 text-center px-4',
        className,
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center text-gray-400 dark:text-zinc-600">
        {icon}
      </div>
      <div className="max-w-xs">
        <h3 className="font-semibold text-gray-800 dark:text-zinc-300 mb-1.5">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-500">{description}</p>
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
