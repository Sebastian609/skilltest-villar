import { ICriteria } from './criteria.interface';
import { CriteriaParams } from '../types/characters.types';

export class StatusCriteria implements ICriteria {
  buildQuery(params: CriteriaParams): Record<string, string> {
    if (params.status) {
      return { status: params.status.toLowerCase() };
    }
    return {};
  }
}
