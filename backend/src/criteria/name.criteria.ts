import { ICriteria } from './criteria.interface';
import { CriteriaParams } from '../types/characters.types';

export class NameCriteria implements ICriteria {
  buildQuery(params: CriteriaParams): Record<string, string> {
    if (params.name && params.name.trim().length > 0) {
      return { name: params.name.trim() };
    }
    return {};
  }
}
