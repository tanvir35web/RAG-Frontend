import { useState } from 'react';
import type { ReactNode } from 'react';
import { Layers, Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import type { Tab } from '../../types';
import { Analytics } from '@vercel/analytics/react';

interface AppLayoutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: ReactNode;
}

export function AppLayout({ activeTab, onTabChange, children }: AppLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-[#09090f] text-gray-900 dark:text-zinc-100">
      {/* Desktop sidebar — hidden on mobile */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="hidden md:flex"
      />

      <Analytics/>

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Mobile header — hidden on desktop */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-white/6 bg-white dark:bg-[#0c0c14] flex-none">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-1.5 rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-linear-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-none">
              <Layers size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm text-gray-900 dark:text-zinc-100">DocuRAG</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 min-w-0 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>

      {/* Mobile side drawer — hidden on desktop */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </div>
  );
}
