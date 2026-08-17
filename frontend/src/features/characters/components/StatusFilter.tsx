import { useCharactersStore } from '../store/characters.store';
import type { StatusFilter } from '../store/characters.store';

const filters: { label: string; value: StatusFilter }[] = [
  { label: 'Todos', value: '' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
];

export function StatusFilter() {
  const status = useCharactersStore((s) => s.status);
  const setStatus = useCharactersStore((s) => s.setStatus);

  return (
    <div className="flex gap-1.5">
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => setStatus(f.value)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            status === f.value
              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
              : 'border border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
