import { CharacterCard } from './CharacterCard';
import type { Character } from '../../../types/characters.types';

interface CharacterListProps {
  characters: Character[];
}

export function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
