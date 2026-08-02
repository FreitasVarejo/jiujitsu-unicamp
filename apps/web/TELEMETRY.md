# Telemetry — Guia de Integração

Este documento orienta o agente (ou desenvolvedor) responsável por conectar o **Grafana Faro Web SDK** à camada de abstração já implementada neste repositório.

---

## O que já foi feito

A branch `feat/telemetry-abstraction` (commit `dc238cf`) criou uma camada de abstração completa. Todos os pontos de rastreamento estão **instrumentados e funcionando** — hoje eles emitem `console.log` estilizados em desenvolvimento e fazem no-op em produção. O trabalho de integração do Faro consiste apenas em **substituir os stubs** dentro de um único arquivo.

---

## Arquitetura da camada

```
src/
├── services/
│   └── telemetry/
│       ├── types.ts              ← interfaces públicas (não editar)
│       ├── telemetry.service.ts  ← ÚNICO arquivo a editar na integração
│       └── index.ts              ← barrel export
└── components/
    ├── TelemetryPageTracker.component.tsx  ← rastreia rotas SPA
    └── OutboundLink.component.tsx          ← wrapper de links externos
```

O singleton `telemetry` é exportado de `@/services/telemetry` e consumido diretamente pelos componentes e serviços. Não é um Context React — não precisa de Provider.

---

## O único arquivo a editar: `telemetry.service.ts`

Abra `src/services/telemetry/telemetry.service.ts`. Cada método tem um bloco `// TODO: Faro` que indica exatamente o que chamar:

```ts
trackPageview(route: string): void {
  if (isDev) console.log(...)
  // TODO: Faro — faro.api.pushEvent('pageview', { route })
},

trackEvent(eventName: string, payload?: Record<string, unknown>): void {
  if (isDev) console.log(...)
  // TODO: Faro — faro.api.pushEvent(eventName, payload)
},

trackApiMetric(metric: TelemetryApiMetric): void {
  if (isDev) console.log(...)
  // TODO: Faro — faro.api.pushMeasurement({ type: 'http_request', values: {...}, context: {...} })
},

trackError(error: Error, context?: TelemetryErrorContext): void {
  if (isDev) console.log(...)
  // TODO: Faro — faro.api.pushError(error, { context })
},
```

---

## Passo a passo para integrar o Faro

### 1. Instalar o SDK

```bash
npm install @grafana/faro-web-sdk @grafana/faro-web-tracing
```

### 2. Inicializar o Faro em `src/main.tsx`

Adicione **antes** do `ReactDOM.createRoot`:

```ts
import { initializeFaro, getWebInstrumentations } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

initializeFaro({
  url: import.meta.env.VITE_FARO_URL, // ex: http://alloy:12345/collect
  app: { name: "jiujitsu-unicamp", version: "1.0.0" },
  instrumentations: [
    ...getWebInstrumentations({ captureConsole: false }),
    new TracingInstrumentation(),
  ],
});
```

Adicione `VITE_FARO_URL` ao `.env.local` e ao GitHub Secrets.

### 3. Substituir os stubs em `telemetry.service.ts`

Importe o Faro no topo do arquivo:

```ts
import { faro } from "@grafana/faro-web-sdk";
```

Substitua cada bloco `// TODO: Faro` pela chamada correspondente. Os comentários já indicam a sintaxe exata.

### 4. Remover os `console.log` de desenvolvimento (opcional)

Os logs de dev podem ser mantidos durante o rollout para comparar o que o browser vê vs. o que o Grafana recebe. Quando a stack estiver estável, remova os blocos `if (isDev)`.

---

## Cobertura de eventos implementada

### Pageviews (automático)

`TelemetryPageTracker` dispara `trackPageview(pathname)` em cada navegação SPA via `useLocation()`.

| Rota              | pathname        |
| ----------------- | --------------- |
| Home              | `/`             |
| Eventos           | `/eventos`      |
| Detalhe de evento | `/evento/:slug` |
| Loja              | `/loja`         |

### Links externos (`outbound_link_click`)

Todos os `<a target="_blank">` foram migrados para `<OutboundLink>`, que dispara `trackEvent('outbound_link_click', { label, url })` automaticamente.

| label                       | Localização                   | Destino                        |
| --------------------------- | ----------------------------- | ------------------------------ |
| `instagram_footer`          | `FooterLinks.component.tsx`   | instagram.com/jiujitsu.unicamp |
| `maps_footer`               | `FooterLinks.component.tsx`   | maps.app.goo.gl                |
| `google_calendar_full`      | `Agenda/index.tsx`            | Google Calendar embed          |
| `maps_event`                | `TimeGridEvent.tsx` (desktop) | maps.google.com/search?query=… |
| `maps_event`                | `EventCard.tsx` (mobile)      | maps.google.com/search?query=… |
| `product_order_form`        | `ProductActions.tsx`          | Google Forms (encomenda)       |
| `product_instagram_contact` | `ProductActions.tsx`          | instagram.com/jiujitsu.unicamp |

### Funil de conversão da loja

| Evento                      | Arquivo                                 | Payload                                 |
| --------------------------- | --------------------------------------- | --------------------------------------- |
| `product_card_click`        | `ProductCard.tsx`                       | `{ productId, productTitle }`           |
| `product_modal_open`        | `ProductModal.tsx`                      | `{ productId, productTitle, category }` |
| `product_order_form`        | `ProductActions.tsx` (via OutboundLink) | `{ productId, productTitle }`           |
| `product_instagram_contact` | `ProductActions.tsx` (via OutboundLink) | `{ productId, productTitle }`           |

### Métricas de API (`trackApiMetric`)

Instrumentado diretamente em `src/services/core/http-client.ts`. Todo `fetch` que passa pelo `HttpClient` gera uma métrica.

| Campo        | Descrição                                                  |
| ------------ | ---------------------------------------------------------- |
| `url`        | URL completa da requisição                                 |
| `latencyMs`  | Tempo em ms da tentativa. `-1` = falha total               |
| `httpStatus` | Código HTTP. `0` = sem resposta (timeout/network error)    |
| `attempt`    | Índice da tentativa (0 = primeira). Ausente em falha total |

Como o `StrapiClient` e o `calendarService` usam o `HttpClient`, todas as chamadas ao Strapi e ao Google Calendar já estão cobertas.

### Erros (`trackError`)

`trackError(error, { url, attempt })` é chamado a cada falha no loop de retry do `HttpClient`. Para capturar erros de UI, adicione um Error Boundary em `App.tsx` (ainda não implementado) que chame `telemetry.trackError(error, { component })`.

---

## O que ver no DevTools hoje (modo dev)

Com `npm run dev`, abra o Console do browser. Você verá os logs estilizados a cada ação:

```
 PAGEVIEW   { route: '/loja' }
 EVENT      product_card_click { productId: '...', productTitle: '...' }
 EVENT      product_modal_open { productId: '...', ... }
 EVENT      outbound_link_click { label: 'product_order_form', url: 'https://...' }
 API        200 142ms { url: 'https://api.../produtos', latencyMs: 142, httpStatus: 200, attempt: 0 }
 ERROR      Falha na requisição: 503 ... { url: '...', attempt: 0 }
```

Use esses logs para validar que todos os eventos estão sendo disparados corretamente antes de conectar o Faro.

---

## Variáveis de ambiente necessárias

| Variável              | Descrição                       | Exemplo                      |
| --------------------- | ------------------------------- | ---------------------------- |
| `VITE_FARO_URL`       | Endpoint do Grafana Alloy/Agent | `http://alloy:12345/collect` |
| `VITE_API_BASE_URL`   | Já existente — URL do Strapi    | `https://api.example.com`    |
| `VITE_API_TOKEN`      | Já existente — token Strapi     | `abc123...`                  |
| `VITE_GOOGLE_API_KEY` | Já existente — Google Calendar  | `AIza...`                    |

Adicione `VITE_FARO_URL` ao `.env.example`, `.env.local` e ao secret `FARO_URL` no GitHub Actions (`deploy.yml`).
