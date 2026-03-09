# AGENTS.md — Jiujitsu Unicamp

Coding agent reference for the `jiujitsu-unicamp` repository. Read this before making changes.

---

## Project Overview

Frontend SPA for the Jiu-Jitsu Unicamp team website. Built with **React 19 + Vite 7 + Tailwind CSS v3**. Data is fetched from the companion `jiujitsu-backend` Strapi v5 CMS via REST API. No backend code lives in this repo. Deployed via Docker + Nginx through GitHub Actions on every push to `main`.

---

## Build/Lint/Dev Commands

**Package manager: `npm`** (never `yarn`/`pnpm`/`bun`).

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server at `http://localhost:5173` |
| `npm run build` | Type-check + bundle to `dist/` (fails on TS/lint errors) |
| `npm run preview` | Serve production build locally for testing |
| `npm run lint` | Run ESLint across entire project |

**⚠️ Important:**
- **No tests exist.** Do not add a test runner unless explicitly instructed.
- Build **fails on TypeScript or ESLint violations**. Always run `npm run lint` and `npm run build` locally before pushing to `main`.
- ESLint enforces: strict TS mode, no unused vars/params, no `any` (use `unknown`), single quotes, 2-space indents.

---

## Code Style & Imports

**No Prettier.** Match surrounding code manually:

### Indentation & Spacing
- **2-space indentation** (not 4, not tabs)
- **Single quotes** for strings
- **Trailing commas** in multi-line structures
- No semicolons (ESLint enforces this)

### Import Order
**External → `@/` absolute → relative.** Do not mix:
```ts
import React from 'react'           // External
import { useService } from '@/services'  // Absolute path alias
import { LocalComponent } from './local'  // Relative
```

### Exports
- **Named exports only** for components, hooks, utilities
- Default exports only in `App.tsx`, `Layout.tsx`, `ScrollToTop.tsx` (legacy)
- Always re-export in barrel `index.ts` files

---

## TypeScript & Type Safety

- **Strict mode enforced** (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- Target `ES2020`, JSX transform `react-jsx`
- Path alias `@/` → `src/` (configured in `tsconfig.app.json`)
- **Avoid `any`** — use `unknown` and narrow the type
- Reserve `any` only at service boundaries with `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
- Prefix unused params with `_`: `(_event, _error) => {}`
- Never use `Function` type; use proper signatures: `() => void`, `(x: T) => U`

---

## Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Component files | `PascalCase.tsx` or `PascalCase.component.tsx` | `Hero.component.tsx` |
| Page files | `kebab-case.page.tsx` | `event-details.page.tsx` |
| Hook files | `kebab-case.hook.ts` | `use-events.hook.ts` |
| Service/util files | `camelCase.ts` | `mediaService.ts` |
| Constants files | `kebab-case.ts` | `calendar-type.ts` |
| Components (exports) | `PascalCase` | `export const Hero = () => ...` |
| Custom hooks | `use` prefix, camelCase | `useEvents`, `useFontsLoaded` |
| Enums | `PascalCase` with members | `Belt.Preta`, `Weekday.Segunda` |
| Enum maps | `SCREAMING_SNAKE_CASE` | `BELT_INFO`, `CALENDAR_TYPE_INFO` |

---

## Error Handling

**In hooks:** `loading / error / data` state with `try/catch/finally`:
```ts
const [data, setData] = useState<T | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
useEffect(() => {
  const load = async () => {
    try { setData(await service.fetch()) }
    catch (err) { setError('Mensagem em português.') }
    finally { setLoading(false) }
  }
  load()
}, [])
```

**In pages:** Render all three states — spinner, error card, content.

**In services:** Throw immediately on non-OK: `if (!response.ok) throw new Error(...)`

---

## Repository Structure

```
src/
├── constants/      # Enums + lookup maps (Belt, CalendarType, etc.)
├── components/     # Shared React components + skeletons
├── hooks/          # Custom React hooks
├── pages/          # Route-level pages; feature self-contained
├── services/       # HTTP layer (Strapi, Google Calendar)
├── adapters/       # Strapi response → typed domain model
├── types/          # Shared TypeScript interfaces
├── layouts/        # App shell (Navbar + Footer)
├── assets/         # Images, SVGs (import as React via ?react)
└── App.tsx, main.tsx
```

---

## Key Principles

1. **Component patterns:** Function components only, no class components. Page in `pages/<feature>/<feature>.page.tsx`, data hook in `<feature>.hook.ts`.
2. **Styling:** Tailwind utilities only. No CSS modules/inline styles except for dynamic Schedule-X colors.
3. **No hardcoded data:** Use enums in `src/constants/` with companion info maps (e.g., `BELT_INFO`, `CALENDAR_TYPE_INFO`).
4. **Parallel fetches:** Wrap each in `try/catch` returning `null` so one failure doesn't abort `Promise.all`.

---

## Environment Variables

Copy `.env.example` to `.env.local` (dev). Production uses GitHub Secrets in `.github/workflows/deploy.yml`:
- `VITE_API_BASE_URL` — Strapi base URL
- `VITE_API_TOKEN` — Strapi read-only token
- `VITE_GOOGLE_API_KEY` — Google Calendar API key

---

## CI/CD

GitHub Actions workflow at `.github/workflows/deploy.yml` triggers on push to `main`. Runs `docker compose up -d --build` on self-hosted runner. **No lint gates in CI** — validate locally first.

---

## Focal Point das Imagens (Frontend)

Todas as imagens do Strapi suportam **focal point** (ponto focal) para melhor posicionamento ao recortar. O focal point é um par de coordenadas percentuais `{ x: number, y: number }` que indicam a área importante da imagem que deve ser preservada.

### Cobertura Implementada

| Contexto | Componente | Uso | CSS |
|---|---|---|---|
| **Eventos** | `EventCard`, `event-details.page` | Cover + galeria | `object-cover` + `objectPosition` |
| **Produtos (card)** | `ProductCard` | Cover image (3:4 ratio) | `object-cover` + `objectPosition` |
| **Produtos (modal)** | `ProductModal` | Cover + carrossel galeria | `object-contain` + `objectPosition` |
| **Instrutores** | `InstructorCard` | Avatar circular 16x16 | `object-cover` + `objectPosition` |
| **Hero carousel** | `Hero.component` | Desktop + mobile | `object-cover` + `objectPosition` |

### Padrão de Implementação

```ts
// Helper function (padrão em todos os componentes)
const imgStyle = (focalPoint: Image['focalPoint']): CSSProperties => ({
  objectFit: 'cover', // ou 'contain' no ProductModal
  objectPosition: focalPoint ? `${focalPoint.x}% ${focalPoint.y}%` : 'center',
});

// Uso em componente
<img
  src={image.url}
  alt={image.alternativeText}
  style={imgStyle(image.focalPoint)}
/>
```

### Proporções de Imagem

- **ProductCard:** `aspect-[3/4]` (retrato 3:4) — apropriado para roupas/camisetas
- **EventCard:** `h-64` (altura fixa) — cards em grid
- **Hero:** Full viewport (`h-screen`) — responsivo desktop/mobile
- **InstructorCard:** `w-16 h-16` (avatar circular) — 1:1 ratio
- **ProductModal:** Fluido (sem aspect-ratio fixo)

### Extração de Focal Point

Os adapters (`adapters.handlers.ts`) extraem focal point automaticamente:
- `resolveImage(file)`: Extrai `focalPoint` da resposta Strapi → objeto `Image`
- `resolveGallery(files[])`: Aplica `resolveImage()` a cada arquivo da galeria

**Endpoints Strapi que enviam focal point:**
- `GET /api/hero-carousel?populate[imagesDesktop]=true&populate[imagesMobile]=true`
- `GET /api/eventos?populate[cover]=true&populate[gallery]=true`
- `GET /api/produtos?populate[cover]=true&populate[gallery]=true`
- `GET /api/instrutores?populate=photo`

---

## Recent Refactors

- **Agenda structure refactoring**: Reorganized `src/pages/home/_components/Agenda/` with clear mobile/desktop separation. Created `_desktop/` subdirectory with `AgendaDesktop.component.tsx` (Schedule-X logic) and `TimeGridEvent.component.tsx`. Created `_mobile/` subdirectory with simplified `AgendaMobile.component.tsx`, extracted `EventCard.component.tsx`, and new `mobile-helpers.ts` (scroll logic + date formatting). Main `Agenda.component.tsx` now handles only orchestration (42 lines). Reduces component sizes from 168→42, 341→138, enables isolated feature development. All scroll logic and day/date helpers (`addDays`, `fmtDDMM`, `fmtDate`, `DAY_LABELS`, `performScroll`) now in `_mobile/mobile-helpers.ts`.
- **Focal point em todas as imagens**: Implementado suporte consistente a focal point em todos os contextos de imagens (hero, eventos, produtos, instrutores). Conversão do Hero de `background-image` para `<img>` tag com `objectPosition` inline. ProductCard alterado de `aspect-square` para `aspect-[3/4]` (retrato 3:4) adequado para roupas/camisetas. Helper function `imgStyle()` padroniza a implementação com fallback `center` se focal point for null. Adapters já extraem focal point automaticamente via `resolveImage()` e `resolveGallery()`. Endpoints Strapi retornam `focalPoint: { x, y }` em todas as chamadas com `populate` ativo.
- **Mobile agenda auto-scroll** (current): Implemented adaptive auto-scroll to today's card on mobile viewport. Uses `useRef` hooks (`containerRef`, `todayRef`) with `useCallback` and `useEffect` for robust DOM synchronization. Smart scroll positioning based on day-of-week: Sunday = top (0px), Monday-Friday = 35% from viewport top, Saturday = max scroll. Date parsing uses manual YYYY-MM-DD split to avoid timezone issues (GMT-3). Includes retry logic (300ms + 100ms) with comprehensive debug logs (`[AgendaMobile]` console prefix). Visual indicator added: today's card has orange border (`border-primary border-2`) + lighter background (`bg-zinc-800`). Only auto-scrolls when current week contains today; silent skip for past/future weeks. Smooth scroll animation via `behavior: 'smooth'` for polished UX.
- **Cancelled event detection & styling** (commit `61eced4`): Added `isCancelledEvent()` detector in `agenda-helpers.ts` for event titles starting with `*` (e.g., `"*Treino Geral - Lucas Senno"`). Updated `parseEventTitle()` to strip the leading `*` before parsing type/instructor. Added `cancelled: boolean` field to `AgendaEvent`. Styled cancelled events with neutral grey colors, red "CANCELADO" badge, and `line-through` decoration on type, instructor, location, and time across both mobile (`AgendaMobile.component.tsx`) and desktop (`TimeGridEvent.component.tsx`) views.
- **Past event styling** (commit `69afa0e`): Added `darkColorsRgbaPast` to `CALENDAR_TYPE_INFO` enum map for each calendar type. Implements visual distinction for past events using darkened, semi-transparent colors. Detection via `isPastEvent()` and `isPastEventFromDateTime()` in `agenda-helpers.ts`. Applied in `TimeGridEvent.component.tsx` and `AgendaMobile.component.tsx`.
- **Calendar constants** (commit `2a3c9ab`): Extracted `calendar-type.ts`, `calendar-location.ts`, `calendar-helpers.ts` following enum architecture. Eliminated triplication of colors and location mappings.
- **Events without instructors** (commit `38bc767`): Added support for events (tipo "Evento") without instructor field. New `eventName?: string` field in `AgendaEvent` interface. Updated `parseEventTitle()` to differentiate between events and trainings: "Evento - Seminário Gracie" parses as `{ type: "EVENTO", eventName: "Seminário Gracie" }` while "Treino Geral - Pablo Viana" parses as `{ type: "TREINO GERAL", instructor: "Pablo Viana" }`. Updated `inferCalendarType()` to properly detect "Evento" prefix and return `CalendarType.EVENTO` (instead of `FALLBACK`) to apply amber/gold colors. Display priority: `eventName` → `instructor` → `type`. Maintains same text size/styling for event names as instructor names in both desktop (`TimeGridEvent.component.tsx`) and mobile (`EventCard.component.tsx`) views.
