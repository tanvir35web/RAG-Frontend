// ─── Navigation ───────────────────────────────────────────────────────────────

export type Tab = 'upload' | 'chat' | 'documents' | 'settings';

// ─── Theme ────────────────────────────────────────────────────────────────────

export type ThemeMode = 'dark' | 'light' | 'system';

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface Settings {
  top_k: number;       // 1–20, default 5
  temperature: number; // 0.0–2.0, default 0.2
}

// ─── Documents ────────────────────────────────────────────────────────────────

export interface DocumentInfo {
  document_name: string;
  chunk_count: number;
  uploaded_at: string | null;
  pages: number[];
}

export interface UploadResult {
  document_name: string;
  chunks_created: number;
  pages_processed: number;
  message: string;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface UploadState {
  status: UploadStatus;
  message?: string;
  result?: UploadResult;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface Citation {
  document_name: string;
  page_number: number;
  chunk_id: string;
  text_excerpt: string;
  relevance_score: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  model?: string;
  isError?: boolean;
}

export interface ChatRequest {
  question: string;
  top_k: number;
  temperature: number;
}

export interface ChatApiResponse {
  answer: string;
  citations: Citation[];
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface HealthResponse {
  status: string;
  version: string;
  timestamp: string;
  services: Record<string, string>;
}

export interface DocumentListResponse {
  documents: DocumentInfo[];
  total: number;
}

export interface DeleteResponse {
  document_name: string;
  chunks_deleted: number;
  message: string;
}
