/**
 * Tipos e interfaces do serviço de telemetria.
 *
 * Projetado para ser compatível com Grafana Faro Web SDK:
 * - trackPageview   → faro.api.pushEvent('pageview', ...)
 * - trackEvent      → faro.api.pushEvent(name, payload)
 * - trackApiMetric  → faro.api.pushMeasurement(...)
 * - trackError      → faro.api.pushError(error, context)
 */

/**
 * Payload para métricas de chamadas HTTP.
 * latencyMs = -1 indica falha total (todas as tentativas esgotadas).
 * httpStatus = 0 indica que nenhuma resposta foi recebida (timeout/network error).
 */
export interface TelemetryApiMetric {
  url: string;
  latencyMs: number;
  httpStatus: number;
  /** Número da tentativa em que a requisição teve sucesso (0 = primeira). */
  attempt?: number;
}

/**
 * Contexto adicional para eventos de erro.
 * Mantemos o índice de assinatura para permitir contextos arbitrários
 * sem perder type-safety nos campos conhecidos.
 */
export interface TelemetryErrorContext {
  url?: string;
  component?: string;
  attempt?: number;
  [key: string]: unknown;
}

/**
 * Contrato público do serviço de telemetria.
 * Todos os métodos são fire-and-forget (void) — nunca devem lançar exceções.
 */
export interface ITelemetryService {
  /**
   * Registra uma navegação de página (SPA route change).
   * @param route - pathname da rota, ex: '/loja', '/evento/slug-do-evento'
   */
  trackPageview(route: string): void;

  /**
   * Registra um evento de negócio customizado.
   * @param eventName - identificador do evento em snake_case, ex: 'product_cta_click'
   * @param payload   - dados contextuais do evento
   */
  trackEvent(eventName: string, payload?: Record<string, unknown>): void;

  /**
   * Registra métricas de uma chamada HTTP (latência, status, retries).
   * Chamado tanto em sucesso quanto em falha pelo HttpClient.
   */
  trackApiMetric(metric: TelemetryApiMetric): void;

  /**
   * Registra um erro com contexto opcional para facilitar triage.
   * Compatível com Error Boundaries e blocos catch dos hooks.
   */
  trackError(error: Error, context?: TelemetryErrorContext): void;
}
