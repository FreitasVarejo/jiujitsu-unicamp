/**
 * Barrel export do módulo de telemetria.
 * Importe sempre a partir de '@/services/telemetry' ou '@/services'.
 */

export { telemetry } from "./telemetry.service";
export type {
  ITelemetryService,
  TelemetryApiMetric,
  TelemetryErrorContext,
} from "./types";
