# Rick & Morty Explorer

Proyecto fullstack: API proxy en Node.js/Express + SPA en React para explorar personajes de Rick and Morty.

## Requisitos previos

- Node.js >= 18
- npm >= 9

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd skilltest-villar

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

## Levantar los proyectos

Necesitas **dos terminales** abiertas simultáneamente:

```bash
# Terminal 1 — Backend (puerto 3000)
cd backend
npm run dev
```

```bash
# Terminal 2 — Frontend (puerto 5173)
cd frontend
npm run dev
```

Abrir **http://localhost:5173** en el navegador.

> El frontend proxea automáticamente las requests `/api` al backend en `localhost:3000` via Vite proxy.

## Scripts disponibles

### Backend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor con hot-reload (tsx watch) |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Ejecuta la versión compilada |

### Frontend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Dev server con HMR |
| `npm run build` | Compila para producción en `dist/` |
| `npm run lint` | Linting con oxlint |

## Estructura del proyecto

```
skilltest-villar/
├── backend/                     # API proxy (Express + TypeScript)
│   └── src/
│       ├── controllers/         # Handlers HTTP
│       ├── criteria/            # Patrón Strategy para query params
│       ├── middleware/          # Validación (Zod) y manejo de errores
│       ├── routes/              # Definición de endpoints
│       ├── schemas/             # Schemas de validación con Zod
│       ├── services/            # Lógica de negocio y llamadas al upstream
│       └── types/               # Interfaces TypeScript
│
└── frontend/                    # SPA (React + TypeScript + Tailwind)
    └── src/
        ├── components/          # Componentes reutilizables (ui/, layout/, feedback/)
        ├── features/characters/ # Feature module completo
        │   ├── components/      # Cards, filtros, paginación, modal
        │   ├── hooks/           # useDebounce
        │   ├── pages/           # CharactersPage
        │   └── store/           # Zustand store
        ├── services/api/        # Capa de acceso a datos (axios)
        └── types/               # Tipos compartidos
```

## API

El backend expone dos endpoints:

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/characters?name=&page=&status=` | Listado paginado (20 por página) |
| `GET` | `/api/characters/:id` | Detalle de un personaje |

Parámetros query soportados: `name` (búsqueda parcial), `page` (entero positivo), `status` (alive, dead, unknown).
