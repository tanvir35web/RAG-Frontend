import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import type { Tab } from '../../types';

interface AppLayoutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: ReactNode;
}

export function AppLayout({ activeTab, onTabChange, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-[#09090f] text-gray-900 dark:text-zinc-100">
      {/* Desktop sidebar — hidden on mobile */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="hidden md:flex"
      />

      {/* Page content */}
      <main className="flex-1 min-w-0 overflow-hidden flex flex-col pb-[60px] md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav — hidden on desktop */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="md:hidden"
      />
    </div>
  );
}
