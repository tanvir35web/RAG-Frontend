# DocuRAG — PDF Intelligence Frontend

A production-quality React frontend for a **Retrieval-Augmented Generation (RAG)** API. Upload PDFs, ask questions in plain text, and get AI-generated answers grounded in your documents — complete with source citations.

---

## Features

- **PDF Upload** — Drag-and-drop or click-to-browse with real-time progress feedback
- **AI Chat** — Conversational Q&A with full Markdown rendering and collapsible source citations
- **Document Manager** — List, inspect, and delete indexed documents
- **Settings Page** — Control `top_k` and `temperature` inference parameters; persisted to `localStorage`
- **Dark / Light / System Theme** — Three-way toggle that follows OS preference by default
- **Mobile Responsive** — Sidebar on desktop, bottom navigation bar on mobile
- **30-second document cache** — Avoids redundant network requests on tab switches

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons | Lucide React |
| Markdown | react-markdown v10 |
| State | React Context API |
| Persistence | `localStorage` (settings, theme) · `sessionStorage` (active tab) |

---

## Project Structure

```
src/
├── api/
│   └── client.ts               # Typed fetch wrapper + ApiError class
│
├── types/
│   └── index.ts                # All shared TypeScript interfaces & types
│
├── utils/
│   ├── cn.ts                   # className merger utility
│   └── format.ts               # formatDate, uid, clamp, formatBytes
│
├── context/
│   ├── ThemeContext.tsx         # dark / light / system theme + .dark class on <html>
│   ├── AppContext.tsx           # documents (30s cache), messages, API health
│   └── SettingsContext.tsx      # top_k, temperature (localStorage)
│
├── hooks/
│   ├── useDocuments.ts          # delete + refresh, wired to AppContext
│   ├── useUpload.ts             # upload state machine + auto-refresh on success
│   ├── useChat.ts               # sendMessage, error handling, wired to AppContext
│   └── useHealth.ts             # API online/offline status
│
├── components/
│   ├── ui/                      # Reusable primitives
│   │   ├── Button.tsx           # variant: primary | secondary | ghost | danger
│   │   ├── Badge.tsx            # variant: default | success | warning | error | violet
│   │   ├── Alert.tsx            # dismissible alert banner
│   │   ├── Spinner.tsx          # animated loading indicator
│   │   └── EmptyState.tsx       # icon + title + description + optional CTA
│   │
│   ├── layout/
│   │   ├── Sidebar.tsx          # Desktop navigation (hidden on mobile)
│   │   ├── MobileNav.tsx        # Fixed bottom navigation (hidden on desktop)
│   │   └── AppLayout.tsx        # Root shell that composes both
│   │
│   ├── upload/
│   │   ├── DropZone.tsx         # Drag-and-drop file picker
│   │   ├── UploadProgress.tsx   # Indeterminate progress bar + spinner
│   │   └── UploadSuccess.tsx    # Success card with chunk/page stats
│   │
│   ├── chat/
│   │   ├── MessageBubble.tsx    # User & assistant message with citations
│   │   ├── CitationCard.tsx     # Collapsible source with relevance score
│   │   ├── MarkdownContent.tsx  # Styled markdown renderer (h1–h3, lists, blockquote, code…)
│   │   ├── TypingIndicator.tsx  # Animated three-dot indicator
│   │   └── ChatInput.tsx        # Auto-resize textarea + send button
│   │
│   ├── documents/
│   │   └── DocumentCard.tsx     # Document card with hover-reveal delete + confirm
│   │
│   └── settings/
│       └── SettingRow.tsx       # Label + description + control layout row
│
├── pages/
│   ├── UploadPage.tsx
│   ├── ChatPage.tsx
│   ├── DocumentsPage.tsx
│   └── SettingsPage.tsx
│
├── App.tsx                      # Tab router (session-persisted active tab)
├── main.tsx                     # Provider tree: Theme > App > Settings
└── index.css                    # Tailwind v4, @custom-variant dark, keyframes
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd RAG-Frontend

# Install dependencies
npm install
```

### Environment Variables

Copy the example file and set your API base URL:

```bash
cp .env.example .env
```

```env
# .env
VITE_API_BASE_URL=https://your-api.onrender.com
```

> The variable is exposed to the browser via Vite's `import.meta.env`. It must be prefixed with `VITE_`.

### Development

```bash
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build      # type-check + bundle
npm run preview    # serve the dist/ folder locally
```

### Lint

```bash
npm run lint
```

---

## API Integration

All requests go through `src/api/client.ts`. The `apiFetch<T>` function:

- Prepends `VITE_API_BASE_URL` to every path
- Throws a typed `ApiError` (with `.status` and `.message`) on non-2xx responses
- Does **not** set `Content-Type` for `FormData` — the browser sets the multipart boundary automatically

### Endpoints used

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | API health check on app mount |
| `POST` | `/api/v1/upload` | Upload a PDF (multipart/form-data) |
| `POST` | `/api/v1/chat` | Ask a question (JSON) |
| `GET` | `/api/v1/documents` | List all indexed documents |
| `DELETE` | `/api/v1/documents/:name` | Delete a document by filename |

---

## State Management

| Concern | Location | Persistence |
|---|---|---|
| Documents list | `AppContext` | In-memory, 30s cache |
| Chat messages | `AppContext` | In-memory (session only) |
| API health | `AppContext` | In-memory |
| Inference settings | `SettingsContext` | `localStorage` |
| Theme mode | `ThemeContext` | `localStorage` |
| Active tab | `App.tsx` | `sessionStorage` |

---

## Theme System

`ThemeContext` manages three modes:

| Mode | Behaviour |
|---|---|
| `dark` | Always applies `.dark` class to `<html>` |
| `light` | Removes `.dark` class from `<html>` |
| `system` | Mirrors `prefers-color-scheme`; re-evaluates on OS change |

Tailwind's `dark:` variant is wired to the `.dark` class via:

```css
/* index.css */
@custom-variant dark (&:is(.dark *));
```

---

## Mobile Layout

| Breakpoint | Navigation | Content padding |
|---|---|---|
| `< md` (< 768px) | Fixed bottom bar (`MobileNav`) | `pb-[60px]` (clears the bar) |
| `≥ md` (≥ 768px) | Fixed left sidebar (`Sidebar`) | None |

The layout shell in `AppLayout.tsx` handles both:

```tsx
<Sidebar  className="hidden md:flex" />   {/* desktop only */}
<MobileNav className="md:hidden" />       {/* mobile only  */}
```

---

## Contributing

1. Fork the repo and create a feature branch
2. Run `npm run lint` and `npm run build` before opening a PR — both must pass
3. Keep components small and single-purpose; add new pages under `src/pages/`
4. All shared types go in `src/types/index.ts`
5. API calls belong in hooks (`src/hooks/`) — never directly in page components

---

## License

MIT
