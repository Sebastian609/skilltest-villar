import { StatusBadge } from '../../../components/ui/StatusBadge';
import { useCharactersStore } from '../store/characters.store';
import type { Character } from '../../../types/characters.types';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const openModal = useCharactersStore((s) => s.openModal);

  return (
    <button
      type="button"
      onClick={() => openModal(character.id)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-900/5 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={character.image}
          alt={character.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-3 py-3">
        <h3 className="w-full truncate text-center text-sm font-semibold text-gray-800 group-hover:text-emerald-700">
          {character.name}
        </h3>
        <StatusBadge status={character.status} />
      </div>
    </button>
  );
}
