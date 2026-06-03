import { Spinner } from '../ui/Spinner';

export function UploadProgress() {
  return (
    <div className="bg-white dark:bg-[#13131e] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-10 flex flex-col items-center gap-5 animate-fade-up">
      <Spinner size={36} />
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 dark:text-zinc-100 mb-1.5">
          Processing PDF…
        </h3>
        <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-xs">
          Extracting text, generating embeddings, and storing vectors.
          This can take 5–30 seconds.
        </p>
      </div>
      <div className="progress-indeterminate w-48" />
    </div>
  );
}
