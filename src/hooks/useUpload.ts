import { useCallback, useState } from 'react';
import { apiFetch } from '../api/client';
import { useAppContext } from '../context/AppContext';
import type { UploadResult, UploadState } from '../types';

interface UseUploadReturn {
  state: UploadState;
  upload: (file: File) => Promise<void>;
  reset: () => void;
}

export function useUpload(): UseUploadReturn {
  const { refreshDocuments } = useAppContext();
  const [state, setState] = useState<UploadState>({ status: 'idle' });

  const upload = useCallback(
    async (file: File) => {
      setState({ status: 'uploading' });
      try {
        const fd = new FormData();
        fd.append('file', file);
        const result = await apiFetch<UploadResult>('/api/v1/upload', {
          method: 'POST',
          body: fd,
          // Do NOT set Content-Type — browser sets multipart/form-data boundary automatically
        });
        setState({ status: 'success', result });
        await refreshDocuments(true);
      } catch (e) {
        setState({ status: 'error', message: (e as Error).message });
      }
    },
    [refreshDocuments],
  );

  const reset = useCallback(() => setState({ status: 'idle' }), []);

  return { state, upload, reset };
}
