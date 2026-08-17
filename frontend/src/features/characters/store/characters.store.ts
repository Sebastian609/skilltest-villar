import { create } from 'zustand';
import { fetchCharacters, fetchCharacterById } from '../../../services/api/characters.api';
import type { Character } from '../../../types/characters.types';

export type StatusFilter = '' | 'alive' | 'dead' | 'unknown';

interface CharactersState {
  characters: Character[];
  totalPages: number;
  totalResults: number;
  loading: boolean;
  error: string | null;

  searchName: string;
  page: number;
  status: StatusFilter;

  selectedCharacter: Character | null;
  detailLoading: boolean;
  detailError: string | null;
  modalOpen: boolean;

  setSearchName: (name: string) => void;
  setPage: (page: number) => void;
  setStatus: (status: StatusFilter) => void;
  openModal: (id: number) => void;
  closeModal: () => void;
  loadCharacters: () => Promise<void>;
  loadCharacterDetail: (id: number) => Promise<void>;
}

let abortRequestId = 0;

export const useCharactersStore = create<CharactersState>((set, get) => ({
  characters: [],
  totalPages: 0,
  totalResults: 0,
  loading: false,
  error: null,

  searchName: '',
  page: 1,
  status: '',

  selectedCharacter: null,
  detailLoading: false,
  detailError: null,
  modalOpen: false,

  setSearchName: (name) => set({ searchName: name, page: 1 }),

  setPage: (page) => set({ page }),

  setStatus: (status) => set({ status, page: 1 }),

  openModal: (id) => {
    set({ modalOpen: true, selectedCharacter: null, detailError: null });
    get().loadCharacterDetail(id);
  },

  closeModal: () => set({ modalOpen: false, selectedCharacter: null, detailError: null }),

  loadCharacters: async () => {
    const { searchName, page, status } = get();
    const requestId = ++abortRequestId;

    set({ loading: true, error: null });

    try {
      const response = await fetchCharacters({
        name: searchName || undefined,
        page,
        status: status || undefined,
      });

      if (requestId !== abortRequestId) return;

      if (response.status === 200 && response.data) {
        set({
          characters: response.data.results,
          totalPages: response.data.info.pages,
          totalResults: response.data.info.count,
          loading: false,
          error: null,
        });
      } else {
        set({
          loading: false,
          error: response.message || 'Error al cargar personajes',
        });
      }
    } catch {
      if (requestId !== abortRequestId) return;
      set({ loading: false, error: 'No se pudo conectar con el servidor' });
    }
  },

  loadCharacterDetail: async (id) => {
    set({ detailLoading: true, detailError: null });

    try {
      const response = await fetchCharacterById(id);

      if (response.status === 200 && response.data) {
        set({ selectedCharacter: response.data, detailLoading: false });
      } else if (response.status === 404) {
        set({ detailLoading: false, detailError: 'Personaje no encontrado' });
      } else {
        set({ detailLoading: false, detailError: response.message || 'Error al cargar personaje' });
      }
    } catch {
      set({ detailLoading: false, detailError: 'No se pudo conectar con el servidor' });
    }
  },
}));
