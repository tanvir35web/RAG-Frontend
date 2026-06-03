const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!BASE_URL) {
  console.warn('[api] VITE_API_BASE_URL is not set. Requests will fail.');
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Typed wrapper around fetch. Throws ApiError on non-2xx responses.
 * Do NOT set Content-Type for FormData — the browser handles the boundary.
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, init);

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      if (typeof body?.detail === 'string') message = body.detail;
    } catch {
      // ignore JSON parse failure
    }
    throw new ApiError(response.status, message);
  }

  return response.json() as Promise<T>;
}
