import { useRef, useState, type ChangeEvent } from 'react';
import { File } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DropZoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function DropZone({ onFileSelected, disabled }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    onFileSelected(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload PDF"
      className={cn(
        'border-2 border-dashed rounded-2xl p-10 sm:p-14',
        'flex flex-col items-center justify-center gap-4',
        'transition-all duration-200 select-none',
        disabled
          ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-white/[0.07]'
          : dragging
          ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/[0.06] cursor-copy'
          : 'border-gray-200 dark:border-white/[0.09] cursor-pointer hover:border-violet-400 dark:hover:border-violet-500/50 hover:bg-violet-50/50 dark:hover:bg-violet-500/[0.03]',
      )}
      onDrop={onDrop}
      onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={e => e.key === 'Enter' && !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={onInputChange}
        disabled={disabled}
      />

      <div className={cn(
        'w-16 h-16 rounded-2xl flex items-center justify-center transition-colors',
        dragging
          ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400'
          : 'bg-gray-100 dark:bg-white/[0.05] text-gray-400 dark:text-zinc-500',
      )}>
        <File size={28} />
      </div>

      <div className="text-center">
        <p className="font-semibold text-gray-800 dark:text-zinc-200 mb-1">
          {dragging ? 'Release to upload' : 'Drop your PDF here'}
        </p>
        <p className="text-sm text-gray-500 dark:text-zinc-500">
          or <span className="text-violet-600 dark:text-violet-400 font-medium">click to browse</span> — max 5 MB
        </p>
      </div>
    </div>
  );
}
