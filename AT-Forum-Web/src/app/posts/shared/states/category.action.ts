import {Category} from '../category';

export class CreateCategory {
  static readonly type = '[Category] CreateCategory';
  constructor(public category: Category) {
  }
}
