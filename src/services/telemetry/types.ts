/**
 * Telemetry types for event tracking and monitoring
 * Part of the Grafana Faro integration for jiujitsu-unicamp
 */

export interface TelemetryApiMetric {
  url: string
  latencyMs: number
  httpStatus: number
  attempt?: number
}

export interface TelemetryErrorContext {
  url?: string
  attempt?: number
  component?: string
  [key: string]: unknown
}
