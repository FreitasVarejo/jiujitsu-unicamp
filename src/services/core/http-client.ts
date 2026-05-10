/**
 * Cliente HTTP genérico com retry automático, tratamento de erros padronizado
 * e instrumentação de telemetria (latência, status, erros por tentativa).
 */

import { telemetry } from "@/services/telemetry";

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
   * Realiza requisição GET genérica com retry, timeout e telemetria.
   */
  static async get<T>(
    url: string,
    options: HttpClientOptions = {}
  ): Promise<T> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= opts.retryCount; attempt++) {
      // Marca o início da tentativa para calcular latência
      const startTime = Date.now();

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

        // Sucesso — registra latência e status HTTP
        telemetry.trackApiMetric({
          url,
          latencyMs: Date.now() - startTime,
          httpStatus: response.status,
          attempt,
        });

        return (await response.json()) as T;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        // Registra o erro desta tentativa específica
        telemetry.trackError(lastError, { url, attempt });

        // Se não for a última tentativa, aguarda e tenta novamente
        if (attempt < opts.retryCount) {
          await sleep(opts.retryDelay);
          continue;
        }
      }
    }

    // Todas as tentativas falharam — registra métrica de falha total
    telemetry.trackApiMetric({
      url,
      latencyMs: -1,
      httpStatus: 0,
    });

    throw lastError || new Error("Erro desconhecido na requisição HTTP");
  }
}
