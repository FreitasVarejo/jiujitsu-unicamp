/**
 * Telemetry service singleton
 * Provides unified interface for tracking pageviews, events, metrics, and errors
 * Integrates with Grafana Faro SDK
 */

import { faro } from '@grafana/faro-web-sdk'
import { TelemetryApiMetric, TelemetryErrorContext } from './types'

const isDev = import.meta.env.DEV

/**
 * Singleton telemetry service
 * All methods emit console logs in development for validation
 * In production, events are sent to Grafana Faro endpoint
 */
export const telemetry = {
  /**
   * Track page navigation in SPA
   * Called by TelemetryPageTracker component on route change
   */
  trackPageview(route: string): void {
    if (isDev) {
      console.log(
        '%c PAGEVIEW',
        'background: #3b82f6; color: white; padding: 2px 8px; border-radius: 3px; font-weight: bold',
        { route },
      )
    }
    faro.api.pushEvent('pageview', { route })
  },

  /**
   * Track custom events with optional payload
   * Used for product interactions, link clicks, conversions, etc.
   */
  trackEvent(eventName: string, payload?: Record<string, unknown>): void {
    if (isDev) {
      console.log(
        '%c EVENT     ',
        'background: #8b5cf6; color: white; padding: 2px 8px; border-radius: 3px; font-weight: bold',
        `${eventName}`,
        payload || {},
      )
    }
    faro.api.pushEvent(eventName, payload)
  },

  /**
   * Track HTTP API metrics (latency, status, retry attempts)
   * Called by HttpClient on each request/retry
   */
  trackApiMetric(metric: TelemetryApiMetric): void {
    if (isDev) {
      const statusColor =
        metric.httpStatus >= 200 && metric.httpStatus < 300
          ? '#10b981'
          : metric.httpStatus >= 400
            ? '#ef4444'
            : '#f59e0b'

      console.log(
        `%c API       %c${metric.httpStatus} %c${metric.latencyMs}ms`,
        'background: #6366f1; color: white; padding: 2px 8px; border-radius: 3px; font-weight: bold',
        `background: ${statusColor}; color: white; padding: 2px 6px; border-radius: 2px; margin: 0 4px;`,
        'color: #64748b; font-size: 0.85em',
        { url: metric.url, attempt: metric.attempt ?? 0 },
      )
    }
    faro.api.pushMeasurement({
      type: 'http_request',
      values: { latency: metric.latencyMs },
      context: {
        url: metric.url,
        httpStatus: metric.httpStatus,
        attempt: metric.attempt,
      },
    })
  },

  /**
   * Track errors and exceptions
   * Called by HttpClient on request failures and by Error Boundary on UI errors
   */
  trackError(error: Error, context?: TelemetryErrorContext): void {
    if (isDev) {
      console.log(
        '%c ERROR     ',
        'background: #ef4444; color: white; padding: 2px 8px; border-radius: 3px; font-weight: bold',
        `${error.message}`,
        { context, stack: error.stack },
      )
    }
    faro.api.pushError(error, context)
  },
}
