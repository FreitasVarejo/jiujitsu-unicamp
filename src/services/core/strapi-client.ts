/**
 * Cliente HTTP específico para comunicação com a API Strapi v5.
 * Estende o HttpClient genérico com funcionalidades específicas do Strapi.
 */

import { HttpClient, HttpClientOptions } from "./http-client";
import { StrapiListResponse, StrapiSingleResponse } from "./types";

const VITE_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:1337";
const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN as string | undefined;

export interface StrapiGetOptions extends HttpClientOptions {
  params?: Record<string, string>;
}

export class StrapiClient {
  /**
   * Resolve URL relativa de mídia para URL absoluta.
   */
  static resolveMediaUrl(relativeUrl: string): string {
    if (!relativeUrl) return "";
    if (relativeUrl.startsWith("http")) return relativeUrl;
    return `${VITE_API_BASE_URL}${relativeUrl}`;
  }

  /**
   * Realiza requisição GET genérica ao Strapi com autenticação automática.
   */
  static async get<T>(
    endpoint: string,
    options: StrapiGetOptions = {}
  ): Promise<T> {
    const { params, ...httpOptions } = options;

    // Constrói URL com query params
    const url = new URL(`${VITE_API_BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value)
      );
    }

    // Adiciona token de autenticação se disponível
    const headers: Record<string, string> = {
      ...httpOptions.headers,
    };
    if (VITE_API_TOKEN) {
      headers["Authorization"] = `Bearer ${VITE_API_TOKEN}`;
    }

    return HttpClient.get<T>(url.toString(), {
      ...httpOptions,
      headers,
    });
  }

  /**
   * Busca uma lista de recursos com paginação.
   */
  static async getList<T>(
    endpoint: string,
    options: StrapiGetOptions = {}
  ): Promise<T[]> {
    const response = await StrapiClient.get<StrapiListResponse<T>>(
      endpoint,
      options
    );
    return response.data;
  }

  /**
   * Busca um único recurso.
   * Se filtros forem fornecidos, busca o primeiro item da lista.
   * Caso contrário, assume que o endpoint retorna um objeto único.
   */
  static async getOne<T>(
    endpoint: string,
    options: StrapiGetOptions = {}
  ): Promise<T> {
    // Se tem filtros, é uma busca em lista
    const hasFilters =
      options.params &&
      Object.keys(options.params).some((key) => key.startsWith("filters"));

    if (hasFilters) {
      const response = await StrapiClient.get<StrapiListResponse<T>>(
        endpoint,
        options
      );
      const item = response.data[0];
      if (!item) {
        throw new Error("Recurso não encontrado");
      }
      return item;
    }

    // Caso contrário, endpoint retorna objeto único
    const response = await StrapiClient.get<StrapiSingleResponse<T>>(
      endpoint,
      options
    );
    return response.data;
  }
}
