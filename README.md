# DuckDuckGo Search App

A full-stack TypeScript search application that proxies queries to DuckDuckGo, stores search history in PostgreSQL, and delivers a rich frontend experience with highlighting, pagination, and a live history sidebar.

---

## Project Overview

The monorepo is split into two packages:

- **`/backend`** — NestJS REST API that proxies DuckDuckGo, persists search history via TypeORM, and serves paginated results with in-memory caching.
- **`/frontend`** — Next.js 15 app with a React Hook Form search input, Zustand state management, client-side pagination, a find-in-page highlighter, and a server-rendered history sidebar.

---

## Architecture Overview

```
duck-duck-go-search/
├── backend/                   # NestJS API
│   └── src/
│       ├── search/            # Search module (controller, service, DTOs, entity)
│       ├── common/            # Shared DTOs (PaginationDto) and constants
│       ├── config/            # TypeORM DataSource configuration
│       └── migrations/        # TypeORM migration files
├── frontend/                  # Next.js application
│   └── src/
│       ├── app/
│       │   ├── @sidebar/      # Parallel route — server-rendered history sidebar
│       │   └── components/    # Search form, results list, pagination, find-in-page
│       ├── components/
│       │   ├── common/        # Shared components (pagination, highlight, error boundary)
│       │   └── ui/            # shadcn/ui component library
│       ├── lib/               # API client (server actions)
│       └── store/             # Zustand store for search state
└── docker-compose.yml         # PostgreSQL service
```

### Request flow

1. User types a query and submits the search form.
2. The frontend calls `POST /search` (saves to history) or `GET /search` (read-only, e.g. pagination).
3. The NestJS backend checks an in-memory cache (5-minute TTL). On a miss, it fetches from `https://api.duckduckgo.com` and transforms the response.
4. Results are paginated server-side and returned as `{ results, total, page, limit }`.
5. The frontend stores results in Zustand and renders them. The history sidebar is a Next.js parallel route (`@sidebar`) fetched as a Server Component on every page load.

---

## Prerequisites

- **Node.js** 20+
- **pnpm** 9+ (both packages use pnpm)
- **Docker** and **Docker Compose** (for PostgreSQL), or a local PostgreSQL 13+ instance

---

## Setup

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd duck-duck-go-search

# Install backend dependencies
cd backend && pnpm install && cd ..

# Install frontend dependencies
cd frontend && pnpm install && cd ..
```

### 2. Configure environment variables

**Backend** — copy the example file and fill in your values:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=search_app
DB_USER=user
DB_PASSWORD=test
PORT=3001
```

**Frontend** — create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start PostgreSQL

```bash
docker compose --env-file ./backend/.env up -d
```

This starts a PostgreSQL 15 container on port `5432`, using the credentials from `backend/.env`.

### 4. Run database migrations

```bash
cd backend
pnpm migration:run
```

This creates the `search_history` table and its index.

---

## Running the Application

### Backend (NestJS)

```bash
cd backend
pnpm start:dev      # development (watch mode)
# or
pnpm start:prod     # production (requires pnpm build first)
```

The API listens on `http://localhost:3001` by default (configurable via `PORT` in `.env`).

### Frontend (Next.js)

```bash
cd frontend
pnpm dev            # development
# or
pnpm build && pnpm start   # production
```

The frontend is available at `http://localhost:3000`.

---

## API Reference

### `GET /search`

Proxy a search query to DuckDuckGo. Results are cached for 5 minutes.

**Query parameters:**

| Parameter | Type   | Required | Default | Description      |
| --------- | ------ | -------- | ------- | ---------------- |
| `q`       | string | ✅       | —       | Search query     |
| `page`    | number | ❌       | 1       | Page number      |
| `limit`   | number | ❌       | 10      | Results per page |

**Response:**

```json
{
  "results": [{ "id": "uuid", "title": "...", "url": "..." }],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

---

### `POST /search`

Same as `GET /search` but additionally persists the query to the `search_history` table.

**Request body:**

```json
{ "query": "search term", "page": 1, "limit": 10 }
```

**Response:** same shape as `GET /search`.

---

### `GET /search/history`

Returns the 10 most recent search queries, ordered newest first.

**Response:**

```json
{
  "history": [
    { "id": "number", "query": "nestjs", "createdAt": "2025-10-27T10:00:00Z" }
  ]
}
```

---

## Database

### Schema

**`search_history`**

| Column       | Type                       | Notes                        |
| ------------ | -------------------------- | ---------------------------- |
| `id`         | `serial`                   | Primary key (auto-generated) |
| `query`      | `varchar(255)`             | Search query text            |
| `created_at` | `timestamp with time zone` | Auto-set on insert, indexed  |

### Migration commands

```bash
cd backend

# Apply all pending migrations
pnpm migration:run

# Revert the last migration
pnpm mmigration:revert

# Generate a new migration from entity changes
pnpm migration:generate src/migrations/<MigrationName>
```
