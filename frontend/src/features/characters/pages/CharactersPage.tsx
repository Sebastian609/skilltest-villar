import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { CharacterList } from '../components/CharacterList';
import { Pagination } from '../components/Pagination';
import { StatusFilter } from '../components/StatusFilter';
import { CharacterDetailModal } from '../components/CharacterDetailModal';
import { Spinner } from '../../../components/ui/Spinner';
import { ErrorMessage } from '../../../components/feedback/ErrorMessage';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { useCharactersStore } from '../store/characters.store';
import { useDebounce } from '../hooks/useDebounce';

export function CharactersPage() {
  const characters = useCharactersStore((s) => s.characters);
  const totalPages = useCharactersStore((s) => s.totalPages);
  const totalResults = useCharactersStore((s) => s.totalResults);
  const loading = useCharactersStore((s) => s.loading);
  const error = useCharactersStore((s) => s.error);
  const page = useCharactersStore((s) => s.page);
  const status = useCharactersStore((s) => s.status);
  const searchName = useCharactersStore((s) => s.searchName);

  const [searchInput, setSearchInput] = useState(searchName);
  const debouncedQuery = useDebounce(searchInput, 300);

  useEffect(() => {
    useCharactersStore.getState().setSearchName(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    useCharactersStore.getState().loadCharacters();
  }, [searchName, page, status]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    useCharactersStore.getState().setPage(newPage);
  }, []);

  const showResults = useMemo(
    () => !loading && !error && characters.length > 0,
    [loading, error, characters.length]
  );

  const resultInfo = useMemo(() => {
    if (loading || error || totalResults === 0) return null;
    return `${totalResults} personaje${totalResults !== 1 ? 's' : ''} encontrado${totalResults !== 1 ? 's' : ''}`;
  }, [loading, error, totalResults]);

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Explora el Multiverso
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Busca y descubre todos los personajes del universo de Rick y Morty
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <SearchBar value={searchInput} onChange={handleSearchChange} />
          </div>
          <StatusFilter />
        </div>

        {resultInfo && (
          <p className="mb-4 text-xs font-medium text-gray-400">{resultInfo}</p>
        )}

        {loading && <Spinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && characters.length === 0 && (
          <EmptyState query={debouncedQuery} />
        )}

        {showResults && (
          <>
            <CharacterList characters={characters} />
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>

      <CharacterDetailModal />
    </>
  );
}
