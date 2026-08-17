# Notas de Diseño

## Backend

- **Patrón Criteria**: Se implementó `NameCriteria`, `PageCriteria` y `StatusCriteria` para desacoplar la construcción de query params del servicio. Cada criterio implementa `ICriteria.buildQuery()`, lo que permite agregar, modificar o eliminar filtros sin tocar la lógica central. Esto sigue el principio abierto/cerrado y facilita testing unitario de cada filtro por separado.
- **Validación con Zod**: Los schemas `charactersQuerySchema` y `characterIdParamSchema` validan y transforman los params de entrada (e.g., string a number) antes de que lleguen al controller. Si la validación falla, se retorna un 400 con mensajes descriptivos. Zod fue elegido por su inferencia de tipos directa a TypeScript.
- **Respuestas HTTP tipadas**: Todas las respuestas siguen un formato `{ status, data?, message? }` consistente, tanto en éxito como en error. El servicio distingue entre 404 del upstream (retorna array vacío con status 200), timeouts (408) y errores inesperados (500). Esto simplifica el manejo en el frontend.
- **Patrón de proxy**: El backend no almacena datos, solo proxea requests a la API de Rick and Morty. Esto permite agregar cache, rate limiting o transformaciones en el futuro sin cambiar el contrato con el frontend.

## Frontend

- **Estructura por features**: `features/characters/` encapsula todo lo relacionado a personajes (components, hooks, store, pages). Esto sigue la recomendación de `skils.md` y permite escalar sin mezclar responsabilidades. Los componentes compartidos (`ui/`, `layout/`, `feedback/`) quedan fuera de features.
- **Zustand para estado global**: Se eligió zustand por su API mínima, ausencia de boilerplate (no providers ni context) y selectores performantes. El store centraliza: lista de personajes, filtros (name, page, status), estado del modal de detalle, y loading/error states. Las acciones `setSearchName` y `setStatus` resetean automáticamente la página a 1.
- **useDebounce como hook custom**: Implementado sin librerías externas (useState + useEffect con clearTimeout). Se usa para debouncing de 300ms en el input de búsqueda, evitando requests innecesarios al backend.
- **Modal en vez de ruta**: El detalle del personaje se muestra en un modal para preservar el contexto del usuario (búsqueda, filtros, página). Se cierra con ESC, click fuera, o botón X. Se usa `document.body.style.overflow = 'hidden'` para bloquear el scroll del fondo.
- **Paleta de colores**: Blanco como fondo base, grises para jerarquía de texto y bordes, verde emerald como color de acento para acciones primarias, estados activos e indicadores de status.
- **Tailwind CSS v4**: Configurado via plugin de Vite, sin archivo de configuración separado. Utilidades de Tailwind directamente en JSX.

## Limitaciones y mejoras con más tiempo

- Agregar tests unitarios (Vitest) y tests de integración (Cypress/Playwright).
- Implementar cache con React Query / TanStack Query para deduplicar requests y manejar stale-while-revalidate.
- Agregar lazy loading de imágenes y skeleton loaders para mejor percepción de carga.
- Pagination con URL params persistidos (bookmarkable) para compartir links directos a páginas específicas.
- Filtros combinados con URL search params para el mismo propósito.
- Rate limiting y cache en el backend con Redis.
- CI/CD pipeline con build y deploy automático.
