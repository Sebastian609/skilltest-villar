import { CriteriaParams } from '../types/characters.types';

export interface ICriteria {
  buildQuery(params: CriteriaParams): Record<string, string>;
}
