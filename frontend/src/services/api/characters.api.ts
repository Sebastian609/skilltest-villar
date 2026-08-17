import axios from 'axios';
import type { CharactersResponse, CharacterDetailResponse } from '../../types/characters.types';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

export interface CharactersParams {
  name?: string;
  page?: number;
  status?: string;
}

export async function fetchCharacters(params: CharactersParams): Promise<CharactersResponse> {
  const query: Record<string, string> = {};
  if (params.name) query.name = params.name;
  if (params.page) query.page = String(params.page);
  if (params.status) query.status = params.status;

  const { data } = await api.get<CharactersResponse>('/characters', { params: query });
  return data;
}

export async function fetchCharacterById(id: number): Promise<CharacterDetailResponse> {
  const { data } = await api.get<CharacterDetailResponse>(`/characters/${id}`);
  return data;
}
