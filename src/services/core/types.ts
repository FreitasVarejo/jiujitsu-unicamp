/**
 * Tipos genéricos para respostas da API Strapi v5.
 */

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StrapiListResponse<T = any> {
  data: T[];
  meta: StrapiMeta;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StrapiSingleResponse<T = any> {
  data: T;
}

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
