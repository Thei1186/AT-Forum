import {Category} from '../../shared/category';

export class CreateCategory {
  static readonly type = '[Category] CreateCategory';
  constructor(public category: Category) {
  }
}

export class GetAllCategories {
  static readonly type = '[Category] GetAllCategories';
}
