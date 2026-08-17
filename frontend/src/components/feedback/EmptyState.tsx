interface EmptyStateProps {
  query?: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-inset ring-emerald-100">
        <svg
          className="h-7 w-7 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-800">
        {query
          ? `No se encontraron resultados para "${query}"`
          : 'No hay personajes para mostrar'}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Intenta con otro término de búsqueda
      </p>
    </div>
  );
}
