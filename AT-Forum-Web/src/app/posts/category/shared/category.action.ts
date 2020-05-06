import {Category} from '../../shared/category';

export class CreateCategory {
  static readonly type = '[Category] CreateCategory';

  constructor(public category: Category) {
  }
}

export class GetAllCategories {
  static readonly type = '[Category] GetAllCategories';
}

export class DeleteCategory {
  static readonly type = '[Category] DeleteCategory';

  constructor(public id: string) {
  }
}

export class EditCategory {
  static readonly type: '[Category] EditCategory';

  constructor(public category: Category) {
  }
}
