/**
 * Implementação do serviço de telemetria.
 *
 * Fase atual: stub de desenvolvimento com console.log estilizado.
 * Os comentários "TODO: Faro" marcam exatamente onde o SDK do Grafana Faro
 * será conectado — sem necessidade de refatorar componentes novamente.
 *
 * Para ativar o Faro no futuro:
 *   1. npm install @grafana/faro-web-sdk @grafana/faro-web-tracing
 *   2. Inicializar o Faro em main.tsx (antes do ReactDOM.render)
 *   3. Substituir os blocos TODO abaixo pelas chamadas faro.api.*
 */

import type {
  ITelemetryService,
  TelemetryApiMetric,
  TelemetryErrorContext,
} from "./types";

// ---------------------------------------------------------------------------
// Utilitários internos
// ---------------------------------------------------------------------------

const isDev = import.meta.env.DEV;

/**
 * Estilos CSS para console.log com contexto visual por categoria.
 * Paleta escura + cores de acento para facilitar a leitura no DevTools.
 */
const LOG_STYLES = {
  pageview: [
    "%c PAGEVIEW ",
    "background:#1e3a5f;color:#7dd3fc;font-weight:bold;padding:1px 6px;border-radius:3px",
  ],
  event: [
    "%c EVENT ",
    "background:#14532d;color:#86efac;font-weight:bold;padding:1px 6px;border-radius:3px",
  ],
  api: [
    "%c API ",
    "background:#3b0764;color:#d8b4fe;font-weight:bold;padding:1px 6px;border-radius:3px",
  ],
  error: [
    "%c ERROR ",
    "background:#7f1d1d;color:#fca5a5;font-weight:bold;padding:1px 6px;border-radius:3px",
  ],
} as const;

// ---------------------------------------------------------------------------
// Factory da implementação
// ---------------------------------------------------------------------------

const createTelemetryService = (): ITelemetryService => ({
  trackPageview(route: string): void {
    if (isDev) {
      console.log(...LOG_STYLES.pageview, { route });
    }
    // TODO: Faro — faro.api.pushEvent('pageview', { route })
  },

  trackEvent(eventName: string, payload?: Record<string, unknown>): void {
    if (isDev) {
      console.log(...LOG_STYLES.event, eventName, payload ?? {});
    }
    // TODO: Faro — faro.api.pushEvent(eventName, payload)
  },

  trackApiMetric(metric: TelemetryApiMetric): void {
    if (isDev) {
      const isFailure = metric.httpStatus === 0 || metric.latencyMs === -1;
      const label = isFailure
        ? `${metric.httpStatus} FAIL`
        : `${metric.httpStatus} ${metric.latencyMs}ms`;
      console.log(...LOG_STYLES.api, label, metric);
    }
    // TODO: Faro — faro.api.pushMeasurement({
    //   type: 'http_request',
    //   values: { latency_ms: metric.latencyMs, http_status: metric.httpStatus },
    //   context: { url: metric.url },
    // })
  },

  trackError(error: Error, context?: TelemetryErrorContext): void {
    if (isDev) {
      console.log(...LOG_STYLES.error, error.message, { error, context });
    }
    // TODO: Faro — faro.api.pushError(error, { context })
  },
});

// ---------------------------------------------------------------------------
// Singleton exportado — use sempre este objeto nos componentes e serviços
// ---------------------------------------------------------------------------

export const telemetry = createTelemetryService();
