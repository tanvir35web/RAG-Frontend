import { FileText, Layers, MessageSquare, Settings, Upload, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useHealth } from '../../hooks/useHealth';
import { useAppContext } from '../../context/AppContext';
import type { Tab } from '../../types';

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'upload',    label: 'Upload',    icon: <Upload size={17} /> },
  { id: 'chat',      label: 'Chat',      icon: <MessageSquare size={17} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={17} /> },
  { id: 'settings',  label: 'Settings',  icon: <Settings size={17} /> },
];

interface MobileNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ activeTab, onTabChange, isOpen, onClose }: MobileNavProps) {
  const { apiOnline } = useHealth();
  const { documents } = useAppContext();

  function handleTabChange(tab: Tab) {
    onTabChange(tab);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-full flex flex-col md:hidden',
          'bg-white dark:bg-[#0c0c14]',
          'border-r border-gray-200 dark:border-white/6',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Brand + close */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-white/6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-none">
              <Layers size={15} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-zinc-100 leading-none">DocuRAG</p>
              <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-0.5">PDF Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                'transition-all duration-150 cursor-pointer text-left',
                activeTab === item.id
                  ? 'bg-violet-500/10 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300'
                  : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-white/5',
              )}
            >
              <span className={cn('flex-none', activeTab === item.id ? 'text-violet-600 dark:text-violet-400' : '')}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.id === 'documents' && documents.length > 0 && (
                <span className="bg-violet-500/15 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {documents.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* API status */}
        <div className="p-4 border-t border-gray-200 dark:border-white/6">
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium',
              apiOnline === null
                ? 'bg-gray-100 dark:bg-zinc-800/50 text-gray-500 dark:text-zinc-500'
                : apiOnline
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
            )}
          >
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full flex-none',
                apiOnline === null
                  ? 'bg-gray-400 dark:bg-zinc-500 animate-pulse'
                  : apiOnline
                  ? 'bg-emerald-500'
                  : 'bg-red-500',
              )}
            />
            {apiOnline === null ? 'Connecting…' : apiOnline ? 'API Online' : 'API Offline'}
          </div>
        </div>
      </aside>
    </>
  );
}
