import { FileText, MessageSquare, Settings, Upload } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Tab } from '../../types';

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'upload',    label: 'Upload',    icon: <Upload size={20} /> },
  { id: 'chat',      label: 'Chat',      icon: <MessageSquare size={20} /> },
  { id: 'documents', label: 'Docs',      icon: <FileText size={20} /> },
  { id: 'settings',  label: 'Settings',  icon: <Settings size={20} /> },
];

interface MobileNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  className?: string;
}

export function MobileNav({ activeTab, onTabChange, className }: MobileNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-white/95 dark:bg-[#0c0c14]/95 backdrop-blur-md',
        'border-t border-gray-200 dark:border-white/[0.06]',
        'pb-safe', // respect iOS safe area
        className,
      )}
    >
      <div className="flex items-center justify-around px-2 py-1">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[60px]',
              'transition-all duration-150 cursor-pointer',
              activeTab === item.id
                ? 'text-violet-600 dark:text-violet-400'
                : 'text-gray-400 dark:text-zinc-500',
            )}
          >
            <span
              className={cn(
                'p-1 rounded-lg transition-colors',
                activeTab === item.id
                  ? 'bg-violet-100 dark:bg-violet-500/15'
                  : '',
              )}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
