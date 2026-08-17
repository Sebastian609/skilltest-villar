export function Header() {
  return (
    <header className="relative overflow-hidden border-b border-gray-200 bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/80" />

      <div className="absolute inset-0 opacity-[0.035]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="portal-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portal-dots)" className="text-emerald-600" />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-sm shadow-emerald-600/20">
            <PortalIcon />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-gray-900">
              Rick & Morty
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Explorer
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-500 sm:flex">
          <span className="cursor-default text-gray-900">Personajes</span>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
    </header>
  );
}

function PortalIcon() {
  return (
    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" strokeDasharray="4 2" opacity={0.6} />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
