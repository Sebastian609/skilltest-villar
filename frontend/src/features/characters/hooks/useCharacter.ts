import { useState, useEffect, useCallback } from 'react';
import { fetchCharacterById } from '../../../services/api/characters.api';
import type { Character } from '../../../types/characters.types';

interface CharacterState {
  character: Character | null;
  loading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  character: null,
  loading: false,
  error: null,
};

export function useCharacter(id: number) {
  const [state, setState] = useState<CharacterState>(initialState);

  const load = useCallback(async (characterId: number) => {
    setState({ character: null, loading: true, error: null });

    try {
      const response = await fetchCharacterById(characterId);

      if (response.status === 200 && response.data) {
        setState({ character: response.data, loading: false, error: null });
      } else if (response.status === 404) {
        setState({ character: null, loading: false, error: 'Personaje no encontrado' });
      } else {
        setState({ character: null, loading: false, error: response.message || 'Error al cargar personaje' });
      }
    } catch {
      setState({ character: null, loading: false, error: 'No se pudo conectar con el servidor' });
    }
  }, []);

  useEffect(() => {
    load(id);
  }, [id, load]);

  return state;
}
