import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { UploadPage } from './pages/UploadPage';
import { ChatPage } from './pages/ChatPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { SettingsPage } from './pages/SettingsPage';
import type { Tab } from './types';

const VALID_TABS: Tab[] = ['upload', 'chat', 'documents', 'settings'];

function readSavedTab(): Tab {
  const saved = sessionStorage.getItem('docurag-tab');
  return VALID_TABS.includes(saved as Tab) ? (saved as Tab) : 'upload';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(readSavedTab);

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    sessionStorage.setItem('docurag-tab', tab);
  }

  return (
    <AppLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {activeTab === 'upload'    && <UploadPage />}
      {activeTab === 'chat'      && <ChatPage />}
      {activeTab === 'documents' && <DocumentsPage />}
      {activeTab === 'settings'  && <SettingsPage />}
    </AppLayout>
  );
}
