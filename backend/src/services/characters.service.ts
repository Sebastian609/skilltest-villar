import axios, { AxiosError } from 'axios';
import { CharacterResponse, Character, CriteriaParams, ProxyResponse, ProxySingleResponse } from '../types/characters.types';
import { ICriteria } from '../criteria/criteria.interface';
import { NameCriteria } from '../criteria/name.criteria';
import { PageCriteria } from '../criteria/page.criteria';
import { StatusCriteria } from '../criteria/status.criteria';

const API_URL = process.env.RICK_AND_MORTY_API_URL || 'https://rickandmortyapi.com/api/character';
const TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT || '10000', 10);

const criteriaList: ICriteria[] = [
  new NameCriteria(),
  new PageCriteria(),
  new StatusCriteria(),
];

function buildQueryString(params: CriteriaParams): Record<string, string> {
  const query: Record<string, string> = {};
  for (const criteria of criteriaList) {
    const result = criteria.buildQuery(params);
    Object.assign(query, result);
  }
  return query;
}

export async function getCharacters(params: CriteriaParams): Promise<ProxyResponse> {
  try {
    const queryParams = buildQueryString(params);
    const response = await axios.get<CharacterResponse>(API_URL, {
      params: queryParams,
      timeout: TIMEOUT,
    });

    return { status: 200, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.code === 'ECONNABORTED') {
      console.error(`[${new Date().toISOString()}] Timeout fetching characters`);
      return { status: 408, message: 'Request timeout - the API took too long to respond' };
    }

    if (axiosError.response) {
      if (axiosError.response.status === 404) {
        return {
          status: 200,
          data: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
        };
      }
      console.error(`[${new Date().toISOString()}] External API error:`, axiosError.response.status);
      return {
        status: 500,
        message: 'Internal server error',
      };
    }

    console.error(`[${new Date().toISOString()}] Unexpected error fetching characters:`, error);
    return { status: 500, message: 'Internal server error' };
  }
}

export async function getCharacterById(id: number): Promise<ProxySingleResponse> {
  try {
    const response = await axios.get<Character>(`${API_URL}/${id}`, {
      timeout: TIMEOUT,
    });

    return { status: 200, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.code === 'ECONNABORTED') {
      console.error(`[${new Date().toISOString()}] Timeout fetching character ${id}`);
      return { status: 408, message: 'Request timeout - the API took too long to respond' };
    }

    if (axiosError.response) {
      if (axiosError.response.status === 404) {
        return { status: 404, message: 'Character not found' };
      }
      console.error(`[${new Date().toISOString()}] External API error for character ${id}:`, axiosError.response.status);
      return { status: 500, message: 'Internal server error' };
    }

    console.error(`[${new Date().toISOString()}] Unexpected error fetching character ${id}:`, error);
    return { status: 500, message: 'Internal server error' };
  }
}
