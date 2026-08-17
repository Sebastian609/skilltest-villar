import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchCharacters } from '../../../services/api/characters.api';
import type { Character } from '../../../types/characters.types';

interface CharactersState {
  characters: Character[];
  totalPages: number;
  totalResults: number;
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  totalPages: 0,
  totalResults: 0,
  loading: false,
  error: null,
};

export function useCharacters(params: { name?: string; page?: number }) {
  const [state, setState] = useState<CharactersState>(initialState);
  const abortRef = useRef(0);

  const load = useCallback(async (name: string | undefined, page: number, requestId: number) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetchCharacters({ name, page });

      if (requestId !== abortRef.current) return;

      if (response.status === 200 && response.data) {
        setState({
          characters: response.data.results,
          totalPages: response.data.info.pages,
          totalResults: response.data.info.count,
          loading: false,
          error: null,
        });
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: response.message || 'Error al cargar personajes',
        }));
      }
    } catch {
      if (requestId !== abortRef.current) return;
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'No se pudo conectar con el servidor',
      }));
    }
  }, []);

  useEffect(() => {
    const requestId = ++abortRef.current;
    load(params.name, params.page || 1, requestId);
  }, [params.name, params.page, load]);

  return state;
}
