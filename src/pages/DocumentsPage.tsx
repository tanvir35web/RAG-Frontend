import { Activity, FileText } from 'lucide-react';
import { DocumentCard } from '../components/documents/DocumentCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { Spinner } from '../components/ui/Spinner';
import { useDocuments } from '../hooks/useDocuments';

export function DocumentsPage() {
  const {
    documents,
    isLoading,
    docsError,
    deletingId,
    deleteError,
    refresh,
    deleteDocument,
  } = useDocuments();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-1.5">
              Documents
            </h1>
            <p className="text-gray-500 dark:text-zinc-500 text-sm">
              {isLoading
                ? 'Loading…'
                : `${documents.length} document${documents.length !== 1 ? 's' : ''} indexed`}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Activity size={14} />}
            loading={isLoading}
            onClick={() => refresh(true)}
          >
            Refresh
          </Button>
        </div>

        {/* Errors */}
        {docsError && (
          <Alert variant="error" className="mb-6">{docsError}</Alert>
        )}
        {deleteError && (
          <Alert variant="error" className="mb-6">{deleteError}</Alert>
        )}

        {/* Loading skeleton */}
        {isLoading && documents.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <Spinner size={32} />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && documents.length === 0 && (
          <EmptyState
            icon={<FileText size={32} />}
            title="No documents yet"
            description="Upload a PDF from the Upload tab to get started."
          />
        )}

        {/* Document grid */}
        {documents.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {documents.map(doc => (
              <DocumentCard
                key={doc.document_name}
                doc={doc}
                isDeleting={deletingId === doc.document_name}
                onDelete={deleteDocument}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
