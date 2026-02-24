# Jiu-Jitsu Unicamp

Site da equipe de Jiu-Jitsu da Unicamp. Frontend SPA em React 19 + Vite 7 + Tailwind CSS v3, consumindo a API REST do CMS headless Strapi (`bjju-backend`).

---

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Rodando localmente (sem Docker)](#rodando-localmente-sem-docker)
- [Rodando localmente com Docker](#rodando-localmente-com-docker)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Comandos úteis](#comandos-úteis)
- [Deploy automático via GitHub Actions](#deploy-automático-via-github-actions)
- [Estrutura de pastas](#estrutura-de-pastas)

---

## Pré-requisitos

- **Node.js** v20+
- **npm** (nunca `yarn`, `pnpm` ou `bun`)
- **Docker** e **Docker Compose** (apenas para o modo Docker)

---

## Rodando localmente (sem Docker)

```bash
# 1. Clone o repositório
git clone <url-do-repo>
cd jiujitsu-unicamp

# 2. Copie o arquivo de variáveis de ambiente
cp .env.example .env.local

# 3. Preencha o .env.local (veja a seção abaixo)

# 4. Instale as dependências
npm install

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`.

> Para que os dados apareçam, o backend (`bjju-backend`) precisa estar rodando em `http://localhost:1337` — ou configure `VITE_API_BASE_URL` no `.env.local` apontando para outro ambiente.

---

## Rodando localmente com Docker

O `docker-compose.override.yml` sobe o container de desenvolvimento com hot-reload ativo.

```bash
# Sobe o container de dev (porta 5173, com volume montado para hot-reload)
docker compose up --build

# Para derrubar
docker compose down
```

> O override aplica automaticamente o target `dev` do Dockerfile e monta o diretório local como volume. As variáveis `VITE_*` precisam estar no `.env.local` — o container as lê via `import.meta.env` em tempo de execução do Vite.

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores. **Nunca commite o `.env.local`** (já está no `.gitignore`).

| Variável | Descrição | Valor para dev |
|---|---|---|
| `VITE_API_BASE_URL` | URL base do backend Strapi | `http://localhost:1337` |
| `VITE_API_TOKEN` | Token de API read-only do Strapi | *(gere em Strapi Admin → API Tokens)* |

`VITE_API_TOKEN` é opcional: se ausente, as requisições são enviadas sem `Authorization` (funciona quando os endpoints Strapi estão configurados como públicos).

---

## Comandos úteis

```bash
npm run dev        # Servidor de desenvolvimento (http://localhost:5173)
npm run build      # Type-check + bundle para dist/
npm run preview    # Serve o build de produção localmente
npm run lint       # ESLint em todo o projeto
```

> **Antes de fazer push para `main`:** rode `npm run lint` e `npm run build` e confirme que ambos passam sem erros. O CI **não** tem gates de lint/type-check — código quebrado vai para produção.

---

## Deploy automático via GitHub Actions

O workflow em `.github/workflows/deploy.yml` dispara a cada push na branch `main`.

### Como funciona

1. O self-hosted runner (rodando no próprio servidor) faz checkout do código
2. Roda `docker compose -f docker-compose.yml up -d --build --remove-orphans`
3. O Docker reconstrói a imagem de produção (multi-stage: build Vite → Nginx)
4. O container é reiniciado e o Traefik roteia `jiujitsuunicamp.com.br` para ele

### Não há GitHub Secrets necessários

O runner já roda no servidor — não precisa de SSH nem de credenciais externas. As variáveis `VITE_*` são embutidas no bundle em build-time pelo Vite, então não há segredos para injetar em CI.

> Se precisar alterar `VITE_API_BASE_URL` ou `VITE_API_TOKEN` para produção, edite diretamente o `docker-compose.yml` adicionando uma seção `build.args` e os `ARG`s correspondentes no `Dockerfile`.

---

## Estrutura de pastas

```
src/
├── adapters/        # Strapi REST response → modelo de domínio tipado
├── components/      # Componentes React compartilhados globalmente
├── constants/       # Enums + mapas: Belt, Weekday, TrainingType
├── layouts/         # Layout.tsx: navbar + footer que envolve todas as páginas
├── pages/           # Páginas por rota — cada feature é auto-contida:
│   ├── home/        #   _components/ → sub-componentes locais
│   ├── eventos/     #   *.hook.ts → busca de dados, *.page.tsx → renderização
│   ├── store/
│   └── not-found/
├── services/        # Camada HTTP: BaseMediaService + mediaService
├── types/           # Interfaces TypeScript compartilhadas (media.ts)
├── App.tsx          # Definição das rotas React Router
└── main.tsx         # Ponto de entrada ReactDOM.createRoot
```
