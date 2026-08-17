export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CriteriaParams {
  name?: string;
  page?: string;
  status?: string;
}

export interface ProxyResponse {
  status: number;
  data?: CharacterResponse;
  message?: string;
}

export interface ProxySingleResponse {
  status: number;
  data?: Character;
  message?: string;
}
