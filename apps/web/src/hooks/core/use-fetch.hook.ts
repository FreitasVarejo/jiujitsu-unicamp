/**
 * Hook especializado para fetching de dados com cache opcional.
 * Wrapper sobre useAsync com funcionalidades adicionais.
 */

import { DependencyList } from "react";
import { useAsync } from "./use-async.hook";
import { AsyncState, FetchOptions } from "./types";

// Cache simples em memória (chave → dados)
const cache = new Map<string, unknown>();

/**
 * Hook para fetching de dados com retry automático e cache opcional.
 *
 * @param fetcher - Função que retorna uma Promise com os dados
 * @param deps - Array de dependências (re-executa quando mudam)
 * @param options - Configurações opcionais
 * @returns Estado com data, loading, error, retry e reset
 *
 * @example
 * const { data, loading, error } = useFetch(
 *   () => eventsService.getAll(),
 *   [],
 *   { cache: true, cacheKey: 'events-list' }
 * )
 */
export const useFetch = <T>(
  fetcher: () => Promise<T>,
  deps: DependencyList,
  options: FetchOptions = {}
): AsyncState<T> => {
  const { cache: enableCache, cacheKey, ...asyncOptions } = options;

  const fetcherWithCache = async (): Promise<T> => {
    // Se cache está habilitado e temos dados em cache, retorna do cache
    if (enableCache && cacheKey && cache.has(cacheKey)) {
      console.log(`[useFetch] Retornando dados do cache: ${cacheKey}`);
      return cache.get(cacheKey) as T;
    }

    // Caso contrário, busca os dados
    const data = await fetcher();

    // Armazena no cache se habilitado
    if (enableCache && cacheKey) {
      console.log(`[useFetch] Armazenando no cache: ${cacheKey}`);
      cache.set(cacheKey, data);
    }

    return data;
  };

  return useAsync(fetcherWithCache, deps, asyncOptions);
};

/**
 * Limpa o cache completo ou uma chave específica.
 */
export const clearCache = (key?: string): void => {
  if (key) {
    cache.delete(key);
    console.log(`[useFetch] Cache limpo: ${key}`);
  } else {
    cache.clear();
    console.log("[useFetch] Cache completo limpo");
  }
};
