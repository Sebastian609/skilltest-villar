import { Modal } from '../../../components/ui/Modal';
import { LazyImage } from '../../../components/ui/LazyImage';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Spinner } from '../../../components/ui/Spinner';
import { ErrorMessage } from '../../../components/feedback/ErrorMessage';
import { useCharactersStore } from '../store/characters.store';
import type { Character } from '../../../types/characters.types';

export function CharacterDetailModal() {
  const modalOpen = useCharactersStore((s) => s.modalOpen);
  const character = useCharactersStore((s) => s.selectedCharacter);
  const loading = useCharactersStore((s) => s.detailLoading);
  const error = useCharactersStore((s) => s.detailError);
  const closeModal = useCharactersStore((s) => s.closeModal);

  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          {character ? character.name : 'Detalle'}
        </h2>
        <button
          type="button"
          onClick={closeModal}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-6 py-5">
        {loading && <Spinner />}

        {error && <ErrorMessage message={error} />}

        {character && <DetailContent character={character} />}
      </div>
    </Modal>
  );
}

function DetailContent({ character }: { character: Character }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 overflow-hidden rounded-xl ring-2 ring-emerald-100">
        <LazyImage
          src={character.image}
          alt={character.name}
          className="h-40 w-40"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">{character.name}</h3>
        <div className="mt-1.5">
          <StatusBadge status={character.status} />
        </div>
      </div>

      <dl className="w-full space-y-2 text-left">
        <DetailRow label="Especie" value={character.species} />
        <DetailRow label="Género" value={character.gender} />
        <DetailRow label="Origen" value={character.origin.name} />
        <DetailRow label="Ubicación" value={character.location.name} />
        <DetailRow label="Episodios" value={`${character.episode.length} episodios`} />
      </dl>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5 ring-1 ring-inset ring-gray-100">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="text-xs font-semibold text-gray-800">{value}</dd>
    </div>
  );
}
