import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { CharacterList } from '../components/CharacterList';
import { Pagination } from '../components/Pagination';
import { Spinner } from '../../../components/ui/Spinner';
import { ErrorMessage } from '../../../components/feedback/ErrorMessage';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { useCharacters } from '../hooks/useCharacters';

export function CharactersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('q') || '';
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  const { characters, totalPages, totalResults, loading, error } = useCharacters({
    name: queryFromUrl || undefined,
    page: pageFromUrl,
  });

  const handleSearch = useCallback(
    (query: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (query) {
          next.set('q', query);
        } else {
          next.delete('q');
        }
        next.set('page', '1');
        return next;
      });
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('page', String(page));
        return next;
      });
    },
    [setSearchParams]
  );

  const showResults = useMemo(
    () => !loading && !error && characters.length > 0,
    [loading, error, characters.length]
  );

  const resultInfo = useMemo(() => {
    if (loading || error || totalResults === 0) return null;
    return `${totalResults} personaje${totalResults !== 1 ? 's' : ''} encontrado${totalResults !== 1 ? 's' : ''}`;
  }, [loading, error, totalResults]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Personajes
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Explora el universo de Rick and Morty
        </p>
      </div>

      <div className="mb-5">
        <SearchBar onSearch={handleSearch} initialValue={queryFromUrl} />
      </div>

      {resultInfo && (
        <p className="mb-4 text-xs font-medium text-zinc-400">{resultInfo}</p>
      )}

      {loading && <Spinner />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && characters.length === 0 && (
        <EmptyState query={queryFromUrl} />
      )}

      {showResults && (
        <>
          <CharacterList characters={characters} />
          <div className="mt-6">
            <Pagination
              currentPage={pageFromUrl}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
