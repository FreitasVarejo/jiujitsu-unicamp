# Jiu-Jitsu Unicamp — Monorepo

Monorepo com o site e o CMS do projeto Jiu-Jitsu Unicamp. Ambos rodam no
homeserver **pi01**, atrás do Traefik, e são deployados por um runner
self-hosted do GitHub Actions no push para `main`.

## Apps

| App        | Caminho     | Stack              | Domínio                        |
| ---------- | ----------- | ------------------ | ------------------------------ |
| Frontend   | `apps/web`  | Vite + React + nginx | `jiujitsuunicamp.com.br`       |
| CMS        | `apps/cms`  | Strapi + PostgreSQL  | `files.jiujitsuunicamp.com.br` |

Cada app mantém seu próprio `README.md`, `Dockerfile` e `.env.example`.

## Produção / deploy (pi01)

O `docker-compose.yml` na **raiz** é a fonte da verdade em produção; define os
três serviços: `web`, `strapi` e `postgres`.

Os deploys são feitos por dois workflows com **path filter** — só redeploya o
app que mudou:

- `.github/workflows/deploy-web.yml` — dispara em `apps/web/**`; roda
  `docker compose up -d --build --no-deps web`.
- `.github/workflows/deploy-cms.yml` — dispara em `apps/cms/**`; roda
  `docker compose --env-file apps/cms/.env up -d --build strapi postgres`.

Os arquivos de env são copiados no runner a partir de `/home/saul/...` e não
são versionados.

### Volumes (dados persistentes)

Os volumes do Postgres e dos uploads do Strapi têm nomes **fixados**
(`bjju-backend_postgres-data`, `bjju-backend_strapi-uploads`) para reaproveitar
os dados já existentes no pi01, criados quando o backend era um repositório
separado.

## Dev local

Para trabalhar em um app isolado, use o `docker-compose.yml` dentro da pasta
do app:

```bash
# Frontend (com hot-reload via override)
cd apps/web && docker compose up

# CMS (Strapi + Postgres)
cd apps/cms && docker compose up
```
