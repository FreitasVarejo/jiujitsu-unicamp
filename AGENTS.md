# AGENTS.md — Jiujitsu Unicamp

Coding agent reference for the `jiujitsu-unicamp` repository. Read this before making changes.

---

## Project Overview

Frontend SPA for the Jiu-Jitsu Unicamp team website. Built with React 19 + Vite 7 + Tailwind CSS v3. Data is fetched from the `jiujitsu-backend` Strapi v5 CMS via REST API. No backend code lives in this repo. Deployed via Docker + Nginx through a GitHub Actions self-hosted runner on every push to `main`.

---

## Commands

**Package manager: `npm`** (use `npm`, never `yarn`/`pnpm`/`bun`).

```bash
# Development
npm run dev          # Start Vite dev server

# Production
npm run build        # Type-check + emit to dist/
npm run preview      # Serve the production build locally

# Linting
npm run lint         # Run ESLint across the entire project
```

### Tests

**There are no tests in this repository.** No testing framework (Jest, Vitest, etc.) is installed. Do not add a test runner or test files unless explicitly instructed to do so.

### Docker

```bash
docker compose up -d --build   # Build and run the production image (Nginx)
```

---

## Local Development Setup

The frontend fetches all data from the `jiujitsu-backend` Strapi instance. To run locally:

1. **Start the backend** — clone `jiujitsu-backend`, copy `.env.example` to `.env`, fill in secrets, then run `npm run dev` (or `docker compose up -d`). Strapi will be available at `http://localhost:1337`.

2. **Configure the frontend env** — copy `.env.example` to `.env.local` and fill in:

   ```
   VITE_API_BASE_URL=http://localhost:1337
   VITE_API_TOKEN=<read-only API token generated in the Strapi admin panel>
   ```

   To generate a token: open `http://localhost:1337/admin` → Settings → API Tokens → Create new token (type: Read-only).

3. **Run the frontend** — `npm run dev`. No proxy is needed; Strapi's CORS already allows `localhost:5173`.

### Environment variables

| Variable | Purpose | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the Strapi backend | `http://localhost:1337` (dev) / `https://files.jiujitsuunicamp.com.br` (prod) |
| `VITE_API_TOKEN` | Read-only Strapi API token — sent as `Authorization: Bearer` on every request | *(generate in Strapi admin)* |

Both variables are consumed by `BaseMediaService` in `src/services/baseMediaService.ts`. `VITE_API_TOKEN` is optional: if absent, requests are sent without an `Authorization` header (useful when Strapi endpoints are configured as public).

---

## Repository Structure

```
src/
├── adapters/        # Strapi REST response → typed domain model (one file per entity)
├── components/      # Globally shared components (e.g. ScrollToTop)
├── constants/       # Enums + companion lookup maps (Belt, Weekday, TrainingType, MediaType)
├── layouts/         # App shell: Layout.tsx wraps every page with navbar + footer
├── pages/           # Route-level pages, self-contained with sub-folders:
│   ├── home/        #   _components/ for local sub-components, *.hook.ts for data
│   ├── eventos/
│   ├── store/
│   └── not-found/
├── services/        # HTTP data-fetching layer (BaseMediaService + mediaService singleton)
├── types/           # Shared TypeScript interfaces (media.ts)
├── App.tsx          # React Router <Routes> definition
└── main.tsx         # ReactDOM.createRoot entry point
```

Every folder exposes a barrel `index.ts` that re-exports its public surface. Always update or create the `index.ts` when adding new exports to a folder.

---

## Data Layer Architecture

### `BaseMediaService` (`src/services/baseMediaService.ts`)

Low-level HTTP client for the Strapi API. Key members:

- `get<T>(endpoint, params?)` — performs an authenticated `fetch` to `{VITE_API_BASE_URL}{endpoint}` with optional query string params. Throws on non-OK responses.
- `resolveMediaUrl(relativeUrl)` — converts a Strapi-relative media URL (e.g. `/uploads/foto.jpg`) to an absolute URL by prepending `VITE_API_BASE_URL`. Pass-through for URLs that are already absolute.
- `StrapiMediaFile` — exported interface `{ url: string; formats?: { thumbnail?, small?, medium?, large? } }` representing a Strapi upload object.

### `mediaService` (`src/services/mediaService.ts`)

Public singleton that exposes typed, domain-level data methods. All methods call `BaseMediaService.get()` with the appropriate Strapi endpoint and `populate`/`pagination` params, then pass the raw response through the relevant adapter.

| Method | Strapi endpoint |
|---|---|
| `getHeroImages()` | `GET /api/hero-carousel?populate=images` |
| `getAllMembers()` | `GET /api/membros?populate=photo&pagination[limit]=250` |
| `getAllTrainings()` | `GET /api/treinos?sort[0]=weekday&sort[1]=startTime&pagination[limit]=250` |
| `getEventIndex()` | `GET /api/eventos?fields[0]=slug&fields[1]=date&sort[0]=date:desc&pagination[limit]=250` |
| `getEventInfo(slug)` | `GET /api/eventos?filters[slug][$eq]={slug}&populate[0]=cover&populate[1]=gallery` |
| `getAllProducts()` | `GET /api/produtos?populate[0]=cover&populate[1]=gallery&populate[2]=categoria&pagination[limit]=250` |
| `getProductCategories()` | `GET /api/categoria-produtos?pagination[limit]=250` |

### Adapters (`src/adapters/`)

Each adapter maps a raw Strapi response item to a typed domain object. Helper functions in `adapters.handlers.ts`:

- `resolveMediaUrl(file)` — takes a `StrapiMediaFile | null | undefined`, returns the resolved absolute URL string or `undefined`.
- `resolveGalleryUrls(files)` — maps an array of `StrapiMediaFile` to resolved URL strings, filtering out any empty values.

Adapters receive the raw `data[]` item directly (not the full response envelope). The `id` field in domain objects is always the Strapi `slug`.

### Strapi response envelope

All Strapi collection endpoints return:
```json
{ "data": [ { "id": 1, "documentId": "...", "slug": "...", ...fields, "cover": { "url": "/uploads/..." } } ],
  "meta": { "pagination": { ... } } }
```
Single-type endpoints return `{ "data": { ...fields } }`. Adapters receive the unwrapped item from `data[]` / `data`.

---

## TypeScript

- **Strict mode is fully enabled** (`strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`). The build will fail if any of these rules are violated.
- Target `ES2020`, module resolution `bundler`, JSX transform `react-jsx`.
- Path alias `@/` resolves to `src/` — configured in both `tsconfig.app.json` and via `vite-tsconfig-paths`.
- Avoid `any`; it triggers an ESLint warning. Use `unknown` and narrow types instead. Reserve `any` only for untyped third-party responses in adapter/service boundary code.
- Prefix intentionally unused parameters with `_` (e.g. `_event`) to satisfy the linter.
- PascalCase-only or `_`-prefixed variables are exempt from the unused-vars rule — do not exploit this.

---

## Code Style

### Formatting

No Prettier is configured. There is no auto-formatter. Match the surrounding code style manually:
- 2-space indentation.
- Single quotes for strings in TypeScript/TSX.
- Trailing commas in multi-line structures.
- No semicolons after JSX closing tags; do use semicolons in `.ts`/`.tsx` statements.

### Imports

Two styles are used — follow these conventions:

- **`@/` alias** — use when importing across feature boundaries (a page importing a service, a component importing a constant, etc.):
  ```ts
  import { mediaService } from "@/services/mediaService";
  import { Belt } from "@/constants";
  import { Event } from "@/types";
  ```
- **Relative imports** — use for intra-feature/local imports within the same folder tree:
  ```ts
  import { useEvents } from "./event.hook";
  import { EventCard } from "./components/EventCard";
  import { BaseMediaService } from "../services/baseMediaService";
  ```

Group imports: external libraries first, then `@/` absolute imports, then relative imports. No blank lines between groups are required, but do not mix the ordering.

---

## Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| React component files | `PascalCase.tsx` or `PascalCase.component.tsx` | `EventCard.tsx`, `Hero.component.tsx` |
| Page files | `kebab-case.page.tsx` | `home.page.tsx`, `event-details.page.tsx` |
| Hook files | `kebab-case.hook.ts` | `event.hook.ts`, `event-details.hook.ts` |
| Adapter files | `kebab-case.adapter.ts` | `event.adapter.ts`, `member.adapter.ts` |
| Service files | `camelCase.ts` | `mediaService.ts`, `baseMediaService.ts` |
| Constants files | `kebab-case.ts` | `training-type.ts`, `belt.ts` |
| Page-private sub-component folders | `_components/` | `pages/home/_components/` |
| React components (exports) | `PascalCase` named export | `export const Hero = () => ...` |
| Custom hooks | `camelCase` with `use` prefix | `useEvents`, `useEventDetails` |
| Enums | `PascalCase` name, `PascalCase` members | `Belt.Preta`, `Weekday.Segunda` |
| Enum companion lookup maps | `SCREAMING_SNAKE_CASE` | `BELT_INFO`, `WEEKDAY_INFO` |
| Singleton service instances | `camelCase` | `mediaService`, `eventAdapter` |
| Classes | `PascalCase` | `BaseMediaService` |

---

## Component Patterns

- **Function components only** — no class components.
- **Named exports only** — never use default exports for components, hooks, or utilities.
- Keep page-level components in `pages/<feature>/<feature>.page.tsx`. Data fetching logic lives in a sibling `<feature>.hook.ts`, not inside the page component itself.
- Sub-components used only within one page go in `pages/<feature>/_components/`. Shared components go in `src/components/`.
- Prefer co-locating types used only in one feature inside that feature's folder rather than `src/types/`.

---

## Error Handling

### In hooks (data fetching)

Always use `loading`/`error` state with `try/catch/finally`:

```ts
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);
      const result = await someService.fetch();
      setData(result);
    } catch (err) {
      console.error("Descriptive context message:", err);
      setError("Mensagem de erro em português para o usuário.");
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);
```

### In pages (conditional rendering)

Handle all three states explicitly:
- **Loading** — spinner via Tailwind `animate-spin`.
- **Error** — red-tinted card with `AlertCircle` (lucide-react) and a user-facing Portuguese message.
- **Empty** — neutral card explaining no content is available.

### In services (HTTP)

Throw on non-OK responses immediately:
```ts
if (!response.ok) throw new Error(`Falha ao carregar recurso: ${response.status}`);
```

### Parallel fetches

When fetching multiple items in parallel with `Promise.all`, wrap each individual call in its own `try/catch` returning `null` on failure. This prevents a single failed item from rejecting the entire batch:

```ts
const results = await Promise.all(
  ids.map(async (id) => {
    try { return await service.fetch(id); }
    catch { return null; }
  })
);
const valid = results.filter(Boolean);
```

---

## Styling (Tailwind CSS)

- Use Tailwind utility classes exclusively — no CSS modules, no inline `style` props, no plain CSS files (except for global resets in `index.css`).
- Custom theme tokens: `primary` (brand color), `background`, `surface` — use these instead of generic color names.
- Custom font families: `font-sans` → Inter, `font-display` → Oswald.
- Responsive design uses Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`).
- SVG assets can be imported as React components via `vite-plugin-svgr`: `import Logo from "@/assets/logo.svg?react"`.

---

## CI/CD

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs `docker compose up -d --build` on the self-hosted runner on every push to `main`. There are no lint or type-check gates in CI — run `npm run lint` and `npm run build` locally before pushing to `main` to catch errors early.
