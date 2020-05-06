import {Category} from '../../shared/category';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CategoryService} from './category.service';
import {CreateCategory, GetAllCategories} from './category.action';
import {tap} from 'rxjs/operators';


export class CategoryStateModel {
  categories: Category[];
}

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    categories: []
  }
})

@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService) {
  }

  @Selector()
  static categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Action(CreateCategory)
  createCategory({getState, setState}: StateContext<CategoryStateModel>, action: CreateCategory) {
    console.log('CAAAAAKE');
    return this.categoryService.createCategory(action.category);
  }

  @Action(GetAllCategories)
  getAllCategories({getState, setState}: StateContext<CategoryStateModel>, action: GetAllCategories) {
    return this.categoryService.getAllCategories()
      .pipe(tap((result) => {
          const state = getState();
          setState({
            ...state,
            categories: result
          });
        })
      );
  }
}
