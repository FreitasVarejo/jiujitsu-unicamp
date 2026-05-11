import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk'
import { TracingInstrumentation } from '@grafana/faro-web-tracing'
import './index.css'
import App from './App'

// Initialize Grafana Faro for telemetry collection
initializeFaro({
  url: import.meta.env.VITE_FARO_URL || 'http://alloy:12345/collect',
  app: { name: 'jiujitsu-unicamp', version: '1.0.0' },
  instrumentations: [
    ...getWebInstrumentations({ captureConsole: false }),
    new TracingInstrumentation(),
  ],
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
