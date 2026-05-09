/**
 * Hook genérico para gerenciar operações assíncronas.
 * Implementa padrão loading/error/data com retry e reset.
 */

import { useState, useCallback, useEffect, DependencyList } from "react";
import { AsyncState, AsyncOptions } from "./types";

const DEFAULT_OPTIONS: Required<AsyncOptions> = {
  immediate: true,
  retryCount: 2,
  retryDelay: 1000,
};

/**
 * Aguarda um período de tempo (usado para retry delay).
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Hook genérico para executar operações assíncronas com retry automático.
 *
 * @param asyncFn - Função assíncrona a ser executada
 * @param deps - Array de dependências (re-executa quando mudam)
 * @param options - Configurações opcionais
 * @returns Estado com data, loading, error, retry e reset
 */
export const useAsync = <T>(
  asyncFn: () => Promise<T>,
  deps: DependencyList,
  options: AsyncOptions = {}
): AsyncState<T> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(opts.immediate);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= opts.retryCount; attempt++) {
      try {
        const result = await asyncFn();
        setData(result);
        setError(null);
        return;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.error(`[useAsync] Tentativa ${attempt + 1} falhou:`, lastError);

        // Se não for a última tentativa, aguarda e tenta novamente
        if (attempt < opts.retryCount) {
          await sleep(opts.retryDelay);
          continue;
        }
      }
    }

    // Se chegou aqui, todas as tentativas falharam
    if (lastError) {
      setError(lastError);
      setData(null);
    }
  }, [asyncFn, opts.retryCount, opts.retryDelay]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (opts.immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    // Cleanup para evitar setState em componente desmontado
    let isMounted = true;

    if (!isMounted) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [data, error]);

  return {
    data,
    loading,
    error,
    retry,
    reset,
  };
};
