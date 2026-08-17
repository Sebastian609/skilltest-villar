import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import type { Character } from '../../../types/characters.types';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    const query = searchParams.get('q') || '';
    const page = searchParams.get('page') || '1';
    navigate(`/character/${character.id}?q=${encodeURIComponent(query)}&page=${page}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-4 rounded-lg border border-zinc-200 bg-white p-3 text-left transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-1"
    >
      <img
        src={character.image}
        alt={character.name}
        className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-zinc-900 group-hover:text-black">
          {character.name}
        </h3>
        <div className="mt-1">
          <StatusBadge status={character.status} />
        </div>
      </div>
      <svg
        className="h-4 w-4 flex-shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
}
