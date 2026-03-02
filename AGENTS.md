# AGENTS.md — Jiujitsu Unicamp

Coding agent reference for the `jiujitsu-unicamp` repository. Read this before making changes.

---

## Project Overview

Frontend SPA for the Jiu-Jitsu Unicamp team website. Built with React 19 + Vite 7 + Tailwind CSS v3. Data is fetched from the companion `jiujitsu-backend` Strapi v5 CMS via REST API. No backend code lives in this repo. Deployed via Docker + Nginx through a GitHub Actions self-hosted runner on every push to `main`.

---

## Commands

**Package manager: `npm`** (never `yarn`/`pnpm`/`bun`).

```bash
npm run dev          # Vite dev server (http://localhost:5173)
npm run build        # Type-check + bundle to dist/
npm run preview      # Serve the production build locally
npm run lint         # ESLint across the entire project
docker compose up -d --build   # Build and run the production Nginx image
```

**There are no tests.** No test runner (Jest, Vitest, etc.) is installed. Do not add one unless explicitly instructed.

---

## Environment Variables

| Variable | Purpose | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the Strapi backend | `http://localhost:1337` (dev) / `https://files.jiujitsuunicamp.com.br` (prod) |
| `VITE_API_TOKEN` | Read-only Strapi API token — sent as `Authorization: Bearer` | *(generate in Strapi admin → API Tokens)* |
| `VITE_GOOGLE_API_KEY` | Google API key for Calendar API v3 (HTTP referer restricted) | *(generate in Google Cloud Console → Credentials)* |

### Local Development

Copy `.env.example` to `.env.local` and fill in the values. `VITE_API_TOKEN` is optional: if absent, requests are sent without an `Authorization` header (works when Strapi endpoints are configured as public). `VITE_API_BASE_URL` and `VITE_API_TOKEN` are consumed by `src/services/baseMediaService.ts`; `VITE_GOOGLE_API_KEY` is consumed by `src/services/calendarService.ts`.

### Production Deployment (GitHub Secrets)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) creates `.env.local` at build time using **Repository Secrets**. Configure these in the GitHub repo settings (**Settings → Secrets and variables → Actions → Repository secrets**):

| Secret | Value |
|---|---|
| `VITE_API_BASE_URL` | Production Strapi URL (e.g., `https://files.jiujitsuunicamp.com.br`) |
| `VITE_API_TOKEN` | Strapi API token from production |
| `VITE_GOOGLE_API_KEY` | Google Calendar API key |

These secrets are **never committed** to the repository and are only accessible to the workflow during deployment.

---

## Repository Structure

```
src/
├── adapters/        # Strapi REST response → typed domain model (one file per entity)
├── components/      # Globally shared React components (e.g. ScrollToTop)
├── constants/       # Enums + lookup maps: Belt, Weekday, TrainingType
├── layouts/         # App shell: Layout.tsx wraps every page with navbar + footer
├── pages/           # Route-level pages; each feature is self-contained:
│   ├── home/        #   _components/ → local sub-components (incl. Agenda/), *.hook.ts → data
│   ├── eventos/     #   event.hook.ts + event.page.tsx + detalhes/ sub-route
│   ├── store/
│   └── not-found/
├── services/        # HTTP layer: BaseMediaService (low-level) + mediaService (Strapi) + calendarService (Google Calendar)
├── types/           # Shared TypeScript interfaces (media.ts)
├── App.tsx          # React Router <Routes> definition
└── main.tsx         # ReactDOM.createRoot entry point
```

Every folder exposes a barrel `index.ts`. Always update or create it when adding new exports.

---

## Domain Types (`src/types/media.ts`)

```ts
interface Image          { url: string; alternativeText: string; }
interface BaseEntity     { id: string; title: string; }          // id is always the Strapi slug
interface Instructor     extends BaseEntity { year: string; course: string; belt: Belt; photo: Image; }
interface EventSummary   extends BaseEntity { date: string; location: string; coverImage: Image; }
interface Event          extends EventSummary { description: string; category: string; gallery: Image[]; }
interface Product        extends BaseEntity { description: string; category: string; price: string; sizes: string[]; coverImage: Image; gallery: Image[]; formsLink?: string; }
interface TrainingSchedule extends BaseEntity { startTime: string; endTime: string; instructor: string; weekday: Weekday; category: TrainingType; }
```

`Image` is used everywhere images appear — never plain `string` URLs.

---

## Data Layer

### `BaseMediaService` (`src/services/baseMediaService.ts`)

- `get<T>(endpoint, params?)` — authenticated `fetch` to `{VITE_API_BASE_URL}{endpoint}`. Throws on non-OK.
- `resolveMediaUrl(relativeUrl)` — prepends `VITE_API_BASE_URL` to relative URLs; pass-through for absolute.
- `StrapiMediaFile` — `{ url: string; alternativeText?: string; formats?: { thumbnail?, small?, medium?, large? } }`.

### `mediaService` (`src/services/mediaService.ts`)

Public singleton. All methods call `BaseMediaService.get()`, then run the result through an adapter.

| Method | Strapi endpoint |
|---|---|
| `getLogo()` | `GET /api/site-config?populate=logo` |
| `getHeroImages()` | `GET /api/hero-carousel?populate=images` → `Image[]` |
| `getAllInstructors()` | `GET /api/instrutores?populate=photo&pagination[limit]=250` |
| `getAllTrainings()` | `GET /api/treinos?sort[0]=weekday&sort[1]=startTime&pagination[limit]=250` |
| `getEventSummaries()` | `GET /api/eventos?populate[cover]=true&fields[0..3]=slug,title,date,location&sort[0]=date:desc&pagination[limit]=250` |
| `getEventDetails(slug)` | `GET /api/eventos?filters[slug][$eq]={slug}&populate[cover]=true&populate[gallery]=true` |
| `getAllProducts()` | `GET /api/produtos?populate[cover]=true&populate[gallery]=true&populate[categoria]=true&pagination[limit]=250` |
| `getProductCategories()` | `GET /api/categoria-produtos?pagination[limit]=250` → `Record<slug, name>` |

### `calendarService` (`src/services/calendarService.ts`)

Fetches events from the **Google Calendar API v3** (public calendar, API key auth). Completely independent from Strapi — no adapters needed.

| Method | API call |
|---|---|
| `getEventsByRange(start, end)` | `GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events?timeMin=...&timeMax=...` → `GoogleCalendarEvent[]` |

`GoogleCalendarEvent` interface: `{ id, summary, start: { dateTime?, date? }, end: { dateTime?, date? }, location?, description? }`.

### Adapters (`src/adapters/`)

Each adapter receives a single unwrapped `data[]` item (not the full envelope). Helpers in `adapters.handlers.ts`:

- `resolveImage(file)` — `StrapiMediaFile | null | undefined` → `Image | undefined`
- `resolveGallery(files)` — `StrapiMediaFile[]` → `Image[]` (filters empties)

`id` in all domain objects is set from `raw.slug`, not `raw.id`.

---

## Strapi Backend Contract

This section defines the exact Strapi v5 schema the backend **must** expose for the frontend to work. The frontend is the source of truth — the backend must conform to these shapes.

### Response Envelope

All collection endpoints return:
```json
{ "data": [{ "id": 1, "documentId": "...", "slug": "...", ...fields }], "meta": { "pagination": { ... } } }
```
Single-type endpoints return `{ "data": { ...fields } }`. Media fields are objects, not IDs — always populate them.

### Collections and Fields

| Strapi collection | API endpoint | Required fields |
|---|---|---|
| `site-config` *(single type)* | `/api/site-config` | `logo` *(media)* |
| `hero-carousel` *(single type)* | `/api/hero-carousel` | `images` *(media array)* |
| `instrutores` | `/api/instrutores` | `slug`, `title`, `year` *(string)*, `course` *(string)*, `belt` *(enum — see below)*, `photo` *(media)* |
| `treinos` | `/api/treinos` | `slug`, `title`, `weekday` *(int)*, `category` *(int)*, `startTime` *(time HH:MM:SS)*, `endTime` *(time HH:MM:SS)*, `instructor` *(string)* |
| `eventos` | `/api/eventos` | `slug`, `title`, `date` *(date YYYY-MM-DD)*, `location`, `description`, `category`, `cover` *(media)*, `gallery` *(media array)* |
| `produtos` | `/api/produtos` | `slug`, `title`, `description`, `price` *(string)*, `sizes` *(JSON string array)*, `cover` *(media)*, `gallery` *(media array)*, `categoria` *(relation → `categoria-produtos`)*, `formsLink` *(string, opcional)* |
| `categoria-produtos` | `/api/categoria-produtos` | `slug`, `name` |

### Enum / Integer Constraints

- **`belt`** string enum — must be exactly one of: `Preta`, `Marrom`, `Roxa`, `Azul`, `Branca`.
- **`weekday`** integer — `0` = Domingo, `1` = Segunda, `2` = Terça, `3` = Quarta, `4` = Quinta, `5` = Sexta, `6` = Sábado.
- **`category`** (TrainingType) integer — `0` = Geral, `1` = Competição, `2` = Feminino, `3` = Noturno.
- **`categoria`** relation — adapter reads `raw.categoria.name` and `raw.categoria.slug`; both must be populated.

---

## TypeScript

- **Strict mode** — `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. The build fails on violations.
- Target `ES2020`, module resolution `bundler`, JSX transform `react-jsx`.
- Path alias `@/` → `src/` (configured in `tsconfig.app.json` + `vite-tsconfig-paths`).
- Avoid `any` — it triggers an ESLint warning. Use `unknown` and narrow the type. Reserve `any` only at adapter/service raw-response boundaries (annotate with `// eslint-disable-next-line @typescript-eslint/no-explicit-any`).
- Prefix intentionally unused parameters with `_` (e.g. `_event`).

---

## Code Style

No Prettier. Match surrounding code manually:
- 2-space indentation, single quotes, trailing commas in multi-line structures.
- Import order: **external libraries → `@/` absolute → relative**. Do not mix.
- **Named exports only** for components, hooks, and utilities. Default exports exist only in `App.tsx`, `Layout.tsx`, and `ScrollToTop.tsx` for legacy reasons — do not add new ones.

---

## Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| React component files | `PascalCase.tsx` or `PascalCase.component.tsx` | `Hero.component.tsx` |
| Page files | `kebab-case.page.tsx` | `event-details.page.tsx` |
| Hook files | `kebab-case.hook.ts` | `event-details.hook.ts` |
| Adapter files | `kebab-case.adapter.ts` | `event.adapter.ts` |
| Service / util files | `camelCase.ts` | `mediaService.ts` |
| Constants files | `kebab-case.ts` | `training-type.ts` |
| React components | `PascalCase` named export | `export const Hero = () => ...` |
| Custom hooks | `use` prefix, camelCase | `useEvents`, `useEventDetails` |
| Enums | PascalCase name + members | `Belt.Preta`, `Weekday.Segunda` |
| Enum companion maps | `SCREAMING_SNAKE_CASE` | `BELT_INFO`, `WEEKDAY_INFO` |

---

## Component & Hook Patterns

- **Function components only** — no class components.
- Page component lives in `pages/<feature>/<feature>.page.tsx`; data fetching in the sibling `<feature>.hook.ts`.
- Sub-components used only within one page go in `pages/<feature>/_components/`. Shared components go in `src/components/`.
- Co-locate feature-specific types inside the feature folder; only truly cross-cutting types belong in `src/types/`.

---

## Error Handling

**In hooks:** always `loading / error / data` state with `try/catch/finally`:
```ts
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
useEffect(() => {
  const load = async () => {
    try { setLoading(true); setData(await service.fetch()); }
    catch (err) { console.error('Context:', err); setError('Mensagem em portugues.'); }
    finally { setLoading(false); }
  };
  load();
}, []);
```

**In pages:** render all three states — loading spinner (`animate-spin`), error card (`AlertCircle` from lucide-react, red tint, Portuguese message), and empty state.

**In services:** throw immediately on non-OK: `if (!response.ok) throw new Error(...)`.

**Parallel fetches:** wrap each call in its own `try/catch` returning `null` so one failure doesn't abort `Promise.all`.

---

## Styling (Tailwind CSS)

- Utility classes only — no CSS modules, no inline `style` props, no plain CSS (except global resets in `index.css`). **Exception:** Schedule-X custom components (e.g. `TimeGridEvent`) require inline `style` for dynamic calendar colors — the library strips wrapper styles when a custom component is provided.
- Custom theme tokens: `primary` (#d26030 orange), `background` (black), `surface` (light grey).
- Custom fonts: `font-sans` → Inter, `font-display` → Oswald.
- Responsive: use Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`).
- SVG assets: import as React components via `vite-plugin-svgr` (`import Logo from "@/assets/logo.svg?react"`).
- The `container` class is configured with `max-width: 1440px` starting at the `xl` breakpoint (≥1440px), with `2rem` padding at `lg` and `xl`. Always use `container` for page-level wrappers — never use `max-w-7xl mx-auto px-...` directly in page components.

---

## Agenda / Google Calendar

The **Agenda** section on the home page displays the weekly training schedule consuming the **Google Calendar API v3** directly (without Strapi). The layout is **responsive**: mobile uses scrollable day cards; desktop uses the **Schedule-X v4** week view.

### Dependencies

- `@schedule-x/react`, `@schedule-x/calendar`, `@schedule-x/theme-default`, `@schedule-x/events-service`, `@schedule-x/calendar-controls`, `@schedule-x/current-time`
- `temporal-polyfill` — Schedule-X v4 uses the Temporal API internally

### Files

| File | Responsibility |
|---|---|
| `src/services/calendarService.ts` | Fetches events from Google Calendar API v3 by date range |
| `src/pages/home/_components/Agenda/Agenda.component.tsx` | Orchestrator: renders `AgendaMobile` (< md) and Schedule-X (≥ md), color legend, link to full calendar |
| `src/pages/home/_components/Agenda/agenda.hook.ts` | Hook `useAgendaEvents`: fetches events for the navigable week, groups by day (0=Sun..6=Sat), exposes `goToPreviousWeek`/`goToNextWeek` |
| `src/pages/home/_components/Agenda/AgendaMobile.component.tsx` | Mobile layout (`md:hidden`): `ChevronLeft / ChevronRight` nav bar with `DD/MM – DD/MM` range, day cards with date, training type, instructor and location |
| `src/pages/home/_components/Agenda/TimeGridEvent.component.tsx` | Custom Schedule-X component (desktop): colors by training type, instructor, location with Maps link |
| `src/pages/home/_components/Agenda/index.ts` | Barrel export |

### Responsive Layout

- **< md (mobile):** `AgendaMobile` — 7 cards (Sun–Sat), each with day name + `DD/MM` date. Navigation bar `ChevronLeft / ChevronRight` with `DD/MM – DD/MM` range in the center. Auto re-fetches on navigation.
- **≥ md (desktop):** Schedule-X week view, 7 columns, with the library's native navigation.
- Breakpoint: `md` (768px).

### Hook `useAgendaEvents`

- `weekStart` — `useState<string>` (YYYY-MM-DD of Sunday), initialized to the current week.
- `weekEnd` — derived from `weekStart + 6 days` (no separate state).
- `useEffect([weekStart, weekEnd])` — re-fetches whenever the week changes.
- `goToPreviousWeek` / `goToNextWeek` — `useCallback` functions that shift `weekStart` by ±7 days.
- Returns: `{ eventsByDay, loading, error, weekStart, weekEnd, goToPreviousWeek, goToNextWeek }`.
- `EventsByDay = Record<number, AgendaEvent[]>` — key is the JS day of week (0=Sun..6=Sat).

### Schedule-X Configuration (desktop)

- `isDark: true`, locale `pt-BR`, timezone `America/Fortaleza`
- `firstDayOfWeek: 7` (Sunday; Schedule-X uses 1-7, **not** 0-6)
- `dayBoundaries: { start: '10:00', end: '23:00' }`, `gridHeight: 500`
- CSS variables for dark/orange theme in `src/index.css` (selector `.sx-react-calendar-wrapper`)
- Override of `h1-h6` in `index.css` to neutralize global styles that bleed into Schedule-X headers
- Wrapper `hidden md:block sx-react-calendar-wrapper` with `height: 600px; max-height: 80vh`
- Code splitting: all `@schedule-x/*` packages + `temporal-polyfill` in a separate chunk via `manualChunks` in `vite.config.ts`

### Training Types (colors derived from Google Calendar summary)

The event `summary` follows the format `"Treino <Type> - Instructor"`. The type is inferred by `inferCalendarId()` with case-insensitive, accent-insensitive matching:

| Type | Color | calendarId |
|---|---|---|
| Geral | `#d26030` (orange, primary) | `geral` |
| Competição | `#dc2626` (red) | `competicao` |
| Noturno | `#6366f1` (indigo) | `noturno` |
| Feminino | `#d97706` (amber) | `feminino` |
| Fallback | `#71717a` (grey) | `fallback` |

The full palettes (`main`, `container`, `onContainer`) are duplicated in `Agenda.component.tsx` (for Schedule-X) and in `AgendaMobile.component.tsx` / `TimeGridEvent.component.tsx` (for cards and custom events). If you change a color, update all three places.

### Locations

Full Google Calendar addresses are mapped to friendly names via `LOCATION_DISPLAY_MAP`:
- "Faculdade de Educação Física..." → **LABFEF**
- "GMU - Ginásio Multidisciplinar..." → **GMU**

The map exists in two places: `agenda.hook.ts` (for mobile cards) and `TimeGridEvent.component.tsx` (for Schedule-X desktop). Keep them in sync.

### Important Notes

- The Schedule-X `fetchEvents` callback receives `range.start`/`range.end` as `Temporal.PlainDate` or `Temporal.ZonedDateTime` objects — use `String(range.start).slice(0, 10)` to extract `YYYY-MM-DD`.
- Custom Schedule-X components (`timeGridEvent`) **must** be defined at module scope (outside React components) to avoid re-creation on every render.
- `TimeGridEvent` and the mobile `EventCard` apply colors via inline `style` (documented exception to the Tailwind rule) because Schedule-X strips wrapper styles when a custom component is provided.
- `AgendaMobile` and Schedule-X fetch **independently**: `useAgendaEvents` feeds the mobile cards; Schedule-X uses its own internal `callbacks.fetchEvents`. Both call `calendarService.getEventsByRange`.

---

## CI/CD

The GitHub Actions workflow at `.github/workflows/deploy.yml` triggers on every push to `main`. It runs `docker compose up -d --build` on the self-hosted runner, which rebuilds the Nginx production image and restarts the container.

**There are no lint or type-check gates in CI.** Run `npm run lint` and `npm run build` locally and confirm both pass before pushing to `main`.

---

## Store Ordering Flow

The `ProductModal` component has two states driven by `product.formsLink`:

- **`formsLink` present** (orders open): primary orange button (`bg-primary`) labeled "Fazer encomenda" opens the Google Forms link in a new tab. Status bullet shows green + "Encomendas abertas". Helper text: "Formulário com instruções de pagamento incluso."
- **`formsLink` absent** (orders closed): zinc button (`bg-zinc-700`) labeled "Acompanhar disponibilidade" opens the WhatsApp group link. Status bullet shows gray + "Encomendas encerradas no momento". Helper text: "Avisamos no grupo quando novas encomendas abrirem."

The WhatsApp group invite link is hardcoded in the constant `WHATSAPP_GROUP_URL` at the top of `src/pages/store/_components/ProductModal.tsx`. Update it directly when the invite link changes — no backend change needed.
