import { ICriteria } from './criteria.interface';
import { CriteriaParams } from '../types/characters.types';

export class PageCriteria implements ICriteria {
  buildQuery(params: CriteriaParams): Record<string, string> {
    if (params.page) {
      return { page: params.page };
    }
    return {};
  }
}
