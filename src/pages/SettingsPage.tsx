import { Monitor, Moon, RotateCcw, Sun } from 'lucide-react';
import { SettingRow } from '../components/settings/SettingRow';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils/cn';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import type { ThemeMode } from '../types';

const THEME_OPTIONS: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { id: 'light',  label: 'Light',  icon: <Sun size={15} /> },
  { id: 'dark',   label: 'Dark',   icon: <Moon size={15} /> },
  { id: 'system', label: 'System', icon: <Monitor size={15} /> },
];

export function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { mode, setMode } = useTheme();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-1.5">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-zinc-500 text-sm">
            Customize appearance and AI inference parameters.
          </p>
        </div>

        {/* Appearance */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
            Appearance
          </h2>
          <div className="bg-white dark:bg-[#13131e] border border-gray-200 dark:border-white/[0.06] rounded-2xl px-5 divide-y divide-gray-100 dark:divide-white/[0.06]">
            <SettingRow
              label="Theme"
              description="Choose how DocuRAG looks. System follows your OS preference."
            >
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/[0.05] rounded-xl p-1">
                {THEME_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setMode(opt.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
                      'transition-all duration-150 cursor-pointer',
                      mode === opt.id
                        ? 'bg-white dark:bg-zinc-800 text-violet-600 dark:text-violet-400 shadow-sm'
                        : 'text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300',
                    )}
                  >
                    {opt.icon}
                    <span className="hidden sm:inline">{opt.label}</span>
                  </button>
                ))}
              </div>
            </SettingRow>
          </div>
        </section>

        {/* AI Parameters */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
            AI Parameters
          </h2>
          <div className="bg-white dark:bg-[#13131e] border border-gray-200 dark:border-white/[0.06] rounded-2xl px-5 divide-y divide-gray-100 dark:divide-white/[0.06]">

            {/* Top K */}
            <SettingRow
              label="Source count (top_k)"
              description="Number of document chunks retrieved as context for each answer. Higher = more context, slower response."
            >
              <div className="flex items-center gap-3">
                <Badge variant="violet">{settings.top_k}</Badge>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={settings.top_k}
                  onChange={e => updateSettings({ top_k: Number(e.target.value) })}
                  className="w-28 sm:w-36 h-1.5 accent-violet-600 cursor-pointer rounded-full"
                />
              </div>
            </SettingRow>

            {/* Temperature */}
            <SettingRow
              label="Temperature"
              description="Controls LLM creativity. Lower (0.0) = factual and deterministic. Higher (2.0) = creative and varied."
            >
              <div className="flex items-center gap-3">
                <Badge variant="violet">{settings.temperature.toFixed(1)}</Badge>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.1}
                  value={settings.temperature}
                  onChange={e => updateSettings({ temperature: Number(e.target.value) })}
                  className="w-28 sm:w-36 h-1.5 accent-violet-600 cursor-pointer rounded-full"
                />
              </div>
            </SettingRow>
          </div>
        </section>

        {/* Reset */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
            Reset
          </h2>
          <div className="bg-white dark:bg-[#13131e] border border-gray-200 dark:border-white/[0.06] rounded-2xl px-5">
            <SettingRow
              label="Reset AI parameters"
              description="Restore top_k and temperature to their factory defaults (5 and 0.2)."
            >
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RotateCcw size={13} />}
                onClick={resetSettings}
              >
                Reset
              </Button>
            </SettingRow>
          </div>
        </section>

        {/* About */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-white/[0.06]">
          <p className="text-xs text-gray-400 dark:text-zinc-600 text-center">
            DocuRAG v1.0 · Powered by gemini-3.1-flash-lite + Pinecone vector database · Developed by Tanvir
          </p>
        </div>
      </div>
    </div>
  );
}
