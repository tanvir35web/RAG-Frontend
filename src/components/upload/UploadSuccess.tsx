import { CheckCircle2, BookOpen, Layers, MessageSquare, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import type { UploadResult } from '../../types';

interface UploadSuccessProps {
  result: UploadResult;
  onUploadAnother: () => void;
  onStartChat: () => void;
}

export function UploadSuccess({ result, onUploadAnother, onStartChat }: UploadSuccessProps) {
  return (
    <div className="bg-white dark:bg-[#13131e] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-10 flex flex-col items-center gap-5 animate-fade-up">
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
        <CheckCircle2 size={28} className="text-emerald-500" />
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-gray-900 dark:text-zinc-100 mb-1">
          Upload Complete
        </h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400 break-all">
          {result.document_name}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        <div className="flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 rounded-xl px-4 py-2 text-sm">
          <Layers size={14} />
          <span><strong>{result.chunks_created}</strong> chunks</span>
        </div>
        <div className="flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 rounded-xl px-4 py-2 text-sm">
          <BookOpen size={14} />
          <span><strong>{result.pages_processed}</strong> pages</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 flex-wrap justify-center">
        <Button variant="ghost" onClick={onUploadAnother} leftIcon={<Plus size={15} />}>
          Upload Another
        </Button>
        <Button onClick={onStartChat} leftIcon={<MessageSquare size={15} />}>
          Start Chat
        </Button>
      </div>
    </div>
  );
}
