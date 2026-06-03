import { useState } from 'react';
import { Bot, ChevronDown, ChevronUp, Hash, User, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';
import { CitationCard } from './CitationCard';
import { MarkdownContent } from './MarkdownContent';
import type { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const citationCount = message.citations?.length ?? 0;

  return (
    <div
      className={cn(
        'flex gap-3 animate-fade-up',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center flex-none mt-0.5">
          <Bot size={15} className="text-violet-600 dark:text-violet-400" />
        </div>
      )}

      <div className={cn('flex flex-col gap-2', isUser ? 'max-w-[85%] sm:max-w-md items-end' : 'max-w-[90%] sm:max-w-2xl')}>
        {/* Bubble */}
        <div
          className={cn(
            'rounded-2xl px-4 py-3',
            isUser
              ? 'bg-violet-600 text-white text-sm leading-relaxed rounded-tr-sm'
              : cn(
                  'bg-white dark:bg-[#13131e]',
                  'border border-gray-200 dark:border-white/[0.06]',
                  'text-gray-800 dark:text-zinc-200 rounded-tl-sm',
                  message.isError && 'border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5',
                ),
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <MarkdownContent content={message.content} />
          )}
        </div>

        {/* Citations — collapsed by default */}
        {!isUser && citationCount > 0 && (
          <div className="w-full">
            {/* Toggle header */}
            <button
              onClick={() => setSourcesOpen(o => !o)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg w-full text-left',
                'text-xs font-medium transition-colors cursor-pointer',
                sourcesOpen
                  ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300'
                  : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/[0.04]',
              )}
            >
              <Hash size={11} className="flex-none" />
              <span className="flex-1">
                {citationCount} source{citationCount !== 1 ? 's' : ''}
              </span>
              {sourcesOpen
                ? <ChevronUp size={12} className="flex-none" />
                : <ChevronDown size={12} className="flex-none" />}
            </button>

            {/* Citation cards */}
            {sourcesOpen && (
              <div className="mt-1.5 space-y-1.5 animate-fade-up">
                {message.citations!.map(c => (
                  <CitationCard key={c.chunk_id} citation={c} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Model tag */}
        {!isUser && message.model && (
          <p className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-zinc-600 px-1">
            <Zap size={10} /> {message.model}
          </p>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-gray-200 dark:bg-zinc-700/50 flex items-center justify-center flex-none mt-0.5">
          <User size={15} className="text-gray-600 dark:text-zinc-400" />
        </div>
      )}
    </div>
  );
}
