import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ThemeMode } from '../types';

interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  const shouldBeDark = mode === 'dark' || (mode === 'system' && resolveSystemDark());
  root.classList.toggle('dark', shouldBeDark);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('docurag-theme') as ThemeMode) ?? 'system';
  });

  const setMode = useCallback((next: ThemeMode) => {
    localStorage.setItem('docurag-theme', next);
    setModeState(next);
    applyTheme(next);
  }, []);

  // Apply on first render
  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Watch system preference changes when in 'system' mode
  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  const isDark = useMemo(
    () => mode === 'dark' || (mode === 'system' && resolveSystemDark()),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, isDark, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
