import type { ReactNode } from 'react';

interface SettingRowProps {
  label: string;
  description?: string;
  children: ReactNode;
}

export function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-5 border-b border-gray-100 dark:border-white/[0.06] last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-zinc-200">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="flex-none">{children}</div>
    </div>
  );
}
