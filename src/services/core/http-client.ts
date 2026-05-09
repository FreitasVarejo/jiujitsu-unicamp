/**
 * Cliente HTTP genérico com retry automático e tratamento de erros padronizado.
 */

export interface HttpClientOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

const DEFAULT_OPTIONS: Required<HttpClientOptions> = {
  headers: {},
  timeout: 30000, // 30s
  retryCount: 2,
  retryDelay: 1000, // 1s
};

/**
 * Aguarda um período de tempo (usado para retry delay).
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Realiza uma requisição HTTP GET com retry automático.
 */
export class HttpClient {
  /**
   * Realiza requisição GET genérica com retry e timeout.
   */
  static async get<T>(
    url: string,
    options: HttpClientOptions = {}
  ): Promise<T> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= opts.retryCount; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), opts.timeout);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...opts.headers,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `Falha na requisição: ${response.status} ${response.statusText}`
          );
        }

        return (await response.json()) as T;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        // Se não for a última tentativa, aguarda e tenta novamente
        if (attempt < opts.retryCount) {
          await sleep(opts.retryDelay);
          continue;
        }
      }
    }

    // Se chegou aqui, todas as tentativas falharam
    throw lastError || new Error("Erro desconhecido na requisição HTTP");
  }
}
