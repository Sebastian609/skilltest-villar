import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import type { Character } from '../../../types/characters.types';

interface CharacterDetailProps {
  character: Character;
}

export function CharacterDetail({ character }: CharacterDetailProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleBack = () => {
    const query = searchParams.get('q') || '';
    const page = searchParams.get('page') || '1';
    navigate(`/?q=${encodeURIComponent(query)}&page=${page}`);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <button
        type="button"
        onClick={handleBack}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Volver al listado
      </button>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={character.image}
              alt={character.name}
              className="h-64 w-full object-cover md:h-72 md:w-72"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-bold text-zinc-900">{character.name}</h1>
              <StatusBadge status={character.status} />
            </div>

            <dl className="mt-5 space-y-3">
              <div className="flex gap-2">
                <dt className="text-sm font-medium text-zinc-500 w-24 flex-shrink-0">Especie</dt>
                <dd className="text-sm text-zinc-900">{character.species}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-sm font-medium text-zinc-500 w-24 flex-shrink-0">Género</dt>
                <dd className="text-sm text-zinc-900">{character.gender}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-sm font-medium text-zinc-500 w-24 flex-shrink-0">Origen</dt>
                <dd className="text-sm text-zinc-900">{character.origin.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-sm font-medium text-zinc-500 w-24 flex-shrink-0">Ubicación</dt>
                <dd className="text-sm text-zinc-900">{character.location.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-sm font-medium text-zinc-500 w-24 flex-shrink-0">Episodios</dt>
                <dd className="text-sm text-zinc-900">{character.episode.length} episodios</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
