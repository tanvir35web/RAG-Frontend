import { useState } from 'react';
import { BookOpen, Clock, FileText, Layers, Loader2, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatDate } from '../../utils/format';
import type { DocumentInfo } from '../../types';

interface DocumentCardProps {
  doc: DocumentInfo;
  isDeleting: boolean;
  onDelete: (name: string) => void;
}

export function DocumentCard({ doc, isDeleting, onDelete }: DocumentCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className={cn(
        'group relative flex items-start gap-4 p-5 rounded-2xl',
        'bg-white dark:bg-[#13131e]',
        'border border-gray-200 dark:border-white/[0.06]',
        'hover:border-gray-300 dark:hover:border-white/[0.1]',
        'hover:shadow-sm dark:hover:shadow-none',
        'transition-all duration-200',
      )}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center flex-none">
        <FileText size={18} className="text-violet-600 dark:text-violet-400" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p
          className="font-medium text-sm text-gray-900 dark:text-zinc-100 truncate mb-2"
          title={doc.document_name}
        >
          {doc.document_name}
        </p>
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-zinc-500 mb-1.5">
          <span className="flex items-center gap-1">
            <Layers size={11} /> {doc.chunk_count} chunks
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={11} /> {doc.pages.length} pages
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-600">
          <Clock size={11} /> {formatDate(doc.uploaded_at)}
        </span>
      </div>

      {/* Delete action */}
      <div className="flex-none">
        {confirmDelete ? (
          <div className="flex items-center gap-1.5 animate-fade-up">
            <span className="text-xs text-gray-500 dark:text-zinc-400 whitespace-nowrap">Delete?</span>
            <button
              onClick={() => { onDelete(doc.document_name); setConfirmDelete(false); }}
              disabled={isDeleting}
              className="text-xs bg-red-50 dark:bg-red-500/15 hover:bg-red-100 dark:hover:bg-red-500/25 text-red-600 dark:text-red-400 px-2 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {isDeleting
                ? <Loader2 size={11} className="animate-spin" />
                : 'Yes'}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs bg-gray-100 dark:bg-white/[0.05] hover:bg-gray-200 dark:hover:bg-white/[0.1] text-gray-600 dark:text-zinc-400 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            title="Delete document"
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center',
              'text-gray-400 dark:text-zinc-600',
              'hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400',
              'transition-all cursor-pointer',
              'opacity-0 group-hover:opacity-100 focus:opacity-100',
            )}
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
