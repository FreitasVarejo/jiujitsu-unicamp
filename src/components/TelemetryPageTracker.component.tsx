/**
 * TelemetryPageTracker Component
 *
 * Automatically tracks SPA page navigation via React Router
 * Fires pageview event on every route change
 *
 * Usage: Add to App.tsx or main Layout inside Routes provider
 *   <Routes>
 *     <TelemetryPageTracker />
 *     <Route path="/" element={<Home />} />
 *     ...
 *   </Routes>
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { telemetry } from '@/services/telemetry'

export const TelemetryPageTracker = () => {
  const location = useLocation()

  useEffect(() => {
    telemetry.trackPageview(location.pathname)
  }, [location.pathname])

  return null
}
