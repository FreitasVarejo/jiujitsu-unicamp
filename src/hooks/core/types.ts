/**
 * Tipos compartilhados para hooks core.
 */

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retry: () => void;
  reset: () => void;
}

export interface AsyncOptions {
  immediate?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

export interface FetchOptions extends AsyncOptions {
  cache?: boolean;
  cacheKey?: string;
}
