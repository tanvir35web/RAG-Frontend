import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center flex-none mt-0.5">
        <Bot size={15} className="text-violet-600 dark:text-violet-400" />
      </div>
      <div className="bg-white dark:bg-[#13131e] border border-gray-200 dark:border-white/[0.06] rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
