import { useCallback, useState } from 'react';
import { apiFetch } from '../api/client';
import { useAppContext } from '../context/AppContext';
import type { DeleteResponse } from '../types';

interface UseDocumentsReturn {
  documents: ReturnType<typeof useAppContext>['documents'];
  isLoading: boolean;
  docsError: string | null;
  deletingId: string | null;
  deleteError: string | null;
  refresh: (force?: boolean) => Promise<void>;
  deleteDocument: (name: string) => Promise<void>;
}

export function useDocuments(): UseDocumentsReturn {
  const { documents, isLoadingDocs, docsError, refreshDocuments } = useAppContext();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteDocument = useCallback(
    async (name: string) => {
      setDeletingId(name);
      setDeleteError(null);
      try {
        await apiFetch<DeleteResponse>(
          `/api/v1/documents/${encodeURIComponent(name)}`,
          { method: 'DELETE' },
        );
        // Force-refresh to sync with server
        await refreshDocuments(true);
      } catch (e) {
        setDeleteError((e as Error).message);
      } finally {
        setDeletingId(null);
      }
    },
    [refreshDocuments],
  );

  return {
    documents,
    isLoading: isLoadingDocs,
    docsError,
    deletingId,
    deleteError,
    refresh: refreshDocuments,
    deleteDocument,
  };
}
