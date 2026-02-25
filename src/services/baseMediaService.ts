const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337';
const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN as string | undefined;

export interface StrapiMediaFile {
  url: string;
  alternativeText?: string;
  focalPoint?: { x: number; y: number } | null;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export class BaseMediaService {
  static resolveMediaUrl(relativeUrl: string): string {
    if (!relativeUrl) return '';
    if (relativeUrl.startsWith('http')) return relativeUrl;
    return `${VITE_API_BASE_URL}${relativeUrl}`;
  }

  static async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${VITE_API_BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };
    if (VITE_API_TOKEN) {
      headers['Authorization'] = `Bearer ${VITE_API_TOKEN}`;
    }

    const response = await fetch(url.toString(), { headers });
    if (!response.ok) {
      throw new Error(`Falha na requisição ${endpoint}: ${response.status}`);
    }
    return response.json();
  }
}
