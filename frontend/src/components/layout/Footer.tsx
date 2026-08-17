export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-gray-200 bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="h-3.5 w-3.5 text-emerald-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
            <circle cx="12" cy="12" r="5" />
          </svg>
          <span>Rick & Morty Explorer</span>
          <span className="text-gray-300">·</span>
          <span>Datos de rickandmortyapi.com</span>
        </div>
      </div>
    </footer>
  );
}
