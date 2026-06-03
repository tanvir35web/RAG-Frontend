import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Citation } from '../../types';

interface CitationCardProps {
  citation: Citation;
}

export function CitationCard({ citation }: CitationCardProps) {
  const [open, setOpen] = useState(false);
  const pct = Math.round(citation.relevance_score * 100);

  const relevanceColor =
    pct >= 80
      ? 'text-emerald-600 dark:text-emerald-400'
      : pct >= 60
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-gray-500 dark:text-zinc-500';

  return (
    <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors text-left gap-2"
        onClick={() => setOpen(o => !o)}
      >
        <span className="flex items-center gap-2 min-w-0 flex-1">
          <FileText size={12} className="text-gray-400 dark:text-zinc-500 flex-none" />
          <span className="text-gray-700 dark:text-zinc-300 text-xs font-medium truncate">
            {citation.document_name}
          </span>
          <span className="text-gray-400 dark:text-zinc-600 text-xs flex-none whitespace-nowrap">
            p.{citation.page_number}
          </span>
        </span>
        <span className="flex items-center gap-1.5 flex-none">
          <span className={cn('text-xs font-semibold', relevanceColor)}>
            {pct}%
          </span>
          {open
            ? <ChevronUp size={12} className="text-gray-400 dark:text-zinc-600" />
            : <ChevronDown size={12} className="text-gray-400 dark:text-zinc-600" />}
        </span>
      </button>
      {open && (
        <p className="px-3 pb-3 pt-1 text-xs text-gray-600 dark:text-zinc-400 leading-relaxed border-t border-gray-200 dark:border-white/[0.06]">
          {citation.text_excerpt}
        </p>
      )}
    </div>
  );
}
