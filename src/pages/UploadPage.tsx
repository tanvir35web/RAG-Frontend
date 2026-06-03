import { AlertCircle } from 'lucide-react';
import { DropZone } from '../components/upload/DropZone';
import { UploadProgress } from '../components/upload/UploadProgress';
import { UploadSuccess } from '../components/upload/UploadSuccess';
import { Alert } from '../components/ui/Alert';
import { useUpload } from '../hooks/useUpload';

export function UploadPage() {
  const { state, upload, reset } = useUpload();

  const isIdle = state.status === 'idle' || state.status === 'error';

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-1.5">
            Upload PDF
          </h1>
          <p className="text-gray-500 dark:text-zinc-500 text-sm">
            Extract, chunk, and index a PDF for AI-powered question answering.
          </p>
        </div>

        {isIdle && (
          <>
            <DropZone onFileSelected={upload} disabled={false} />
            {state.status === 'error' && state.message && (
              <div className="mt-4">
                <Alert
                  variant="error"
                  onClose={reset}
                >
                  <span className="flex items-center gap-2">
                    <AlertCircle size={14} className="flex-none" />
                    {state.message}
                  </span>
                </Alert>
              </div>
            )}
          </>
        )}

        {state.status === 'uploading' && <UploadProgress />}

        {state.status === 'success' && state.result && (
          <UploadSuccess result={state.result} onUploadAnother={reset} />
        )}

        {/* Info card */}
        <div className="mt-8 bg-gray-50 dark:bg-white/[0.025] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            Accepted format
          </p>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-zinc-500">
            {[
              'PDF files with selectable text (not scanned images)',
              'Maximum file size: 50 MB',
              <>Content-Type must be <code className="bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-zinc-400 px-1.5 py-0.5 rounded text-xs">application/pdf</code></>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-zinc-600 flex-none mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
