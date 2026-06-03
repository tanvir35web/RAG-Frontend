import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { apiFetch } from '../api/client';
import type {
  ChatMessage,
  DocumentInfo,
  DocumentListResponse,
  HealthResponse,
} from '../types';

interface AppContextValue {
  // Health
  apiOnline: boolean | null;

  // Documents
  documents: DocumentInfo[];
  isLoadingDocs: boolean;
  docsError: string | null;
  refreshDocuments: (force?: boolean) => Promise<void>;
  setDocuments: React.Dispatch<React.SetStateAction<DocumentInfo[]>>;

  // Chat
  messages: ChatMessage[];
  addMessages: (msgs: ChatMessage[]) => void;
  clearMessages: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const DOCS_CACHE_TTL = 30_000; // 30 seconds

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [docsError, setDocsError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const cacheRef = useRef<{ fetchedAt: number } | null>(null);

  // Health check + initial document fetch on mount
  useEffect(() => {
    apiFetch<HealthResponse>('/health')
      .then(d => setApiOnline(d.status === 'ok'))
      .catch(() => setApiOnline(false));

    // Pre-fetch documents immediately so every page has them on first render
    setIsLoadingDocs(true);
    apiFetch<DocumentListResponse>('/api/v1/documents')
      .then(data => {
        setDocuments(data.documents);
        cacheRef.current = { fetchedAt: Date.now() };
      })
      .catch(e => setDocsError((e as Error).message))
      .finally(() => setIsLoadingDocs(false));
  }, []);

  const refreshDocuments = useCallback(async (force = false) => {
    const now = Date.now();
    const isFresh =
      !force &&
      cacheRef.current &&
      now - cacheRef.current.fetchedAt < DOCS_CACHE_TTL;

    if (isFresh) return;

    setIsLoadingDocs(true);
    setDocsError(null);
    try {
      const data = await apiFetch<DocumentListResponse>('/api/v1/documents');
      setDocuments(data.documents);
      cacheRef.current = { fetchedAt: now };
    } catch (e) {
      setDocsError((e as Error).message);
    } finally {
      setIsLoadingDocs(false);
    }
  }, []);

  const addMessages = useCallback((msgs: ChatMessage[]) => {
    setMessages(prev => [...prev, ...msgs]);
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  return (
    <AppContext.Provider
      value={{
        apiOnline,
        documents,
        isLoadingDocs,
        docsError,
        refreshDocuments,
        setDocuments,
        messages,
        addMessages,
        clearMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
