import { useParams } from 'react-router-dom';
import { CharacterDetail } from '../components/CharacterDetail';
import { Spinner } from '../../../components/ui/Spinner';
import { ErrorMessage } from '../../../components/feedback/ErrorMessage';
import { useCharacter } from '../hooks/useCharacter';

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const characterId = Number(id);

  const { character, loading, error } = useCharacter(characterId);

  if (loading) return <div className="px-4 py-8"><Spinner /></div>;
  if (error) return <div className="px-4 py-8"><ErrorMessage message={error} /></div>;
  if (!character) return null;

  return (
    <div className="px-4 py-8 sm:px-6">
      <CharacterDetail character={character} />
    </div>
  );
}
