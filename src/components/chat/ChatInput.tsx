import { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Spinner } from '../ui/Spinner';
import { cn } from '../../utils/cn';

interface ChatInputProps {
  onSend: (question: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  }

  function submit() {
    if (!value.trim() || isLoading || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  return (
    <div className="flex items-end gap-2.5 bg-white dark:bg-[#13131e] border border-gray-200 dark:border-white/[0.08] rounded-2xl px-4 py-3 focus-within:border-violet-400 dark:focus-within:border-violet-500/50 transition-colors">
      <textarea
        ref={textareaRef}
        className={cn(
          'flex-1 bg-transparent text-sm placeholder-gray-400 dark:placeholder-zinc-600',
          'text-gray-900 dark:text-zinc-100 resize-none outline-none leading-relaxed',
          'min-h-[24px]',
        )}
        placeholder={disabled ? 'Upload a PDF first to start chatting…' : 'Ask a question about your documents…'}
        value={value}
        rows={1}
        disabled={disabled || isLoading}
        onChange={e => { setValue(e.target.value); autoResize(); }}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <button
        onClick={submit}
        disabled={isLoading || !value.trim() || disabled}
        className={cn(
          'w-8 h-8 rounded-xl flex items-center justify-center flex-none transition-all',
          isLoading || !value.trim() || disabled
            ? 'bg-gray-100 dark:bg-white/[0.05] text-gray-400 dark:text-zinc-600 cursor-not-allowed'
            : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20 cursor-pointer',
        )}
        aria-label="Send"
      >
        {isLoading
          ? <Spinner size={15} className="text-gray-400 dark:text-zinc-500" />
          : <Send size={15} />}
      </button>
    </div>
  );
}
