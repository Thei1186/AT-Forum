import {Category} from '../../shared/category';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CategoryService} from './category.service';
import {
  CreateCategory,
  DeleteCategory,
  EditCategory,
  GetAllCategories,
  GetAllCategoryTopics,
  GetCategory
} from './category.action';
import {tap} from 'rxjs/operators';
import {Topic} from '../../shared/topic';
import {Logout} from "../../../auth/shared/auth.action";
import {CommentStateModel} from "../../comment/shared/comment.state";


export class CategoryStateModel {
  categories: Category[];
  category: Category;
  categoryTopics: Topic[];
}

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    categories: [],
    category: undefined,
    categoryTopics: []
  }
})

@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService) {
  }

  @Selector()
  static categoryTopics(state: CategoryStateModel) {
    return state.categoryTopics;
  }

  @Selector()
  static categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Selector()
  static category(state: CategoryStateModel) {
    return state.category;
  }

  @Action(CreateCategory)
  createCategory({getState, setState}: StateContext<CategoryStateModel>, action: CreateCategory) {
    return this.categoryService.createCategory(action.category);
  }

  @Action(GetAllCategoryTopics)
  getAllCategoryTopics({getState, setState}: StateContext<CategoryStateModel>, action: GetAllCategoryTopics) {
    return this.categoryService.getAllCategoryTopics(action.id)
      .pipe(tap((result) => {
          const state = getState();
          setState({
            ...state,
            categoryTopics: result
          });
        })
      );
  }

  @Action(GetAllCategories)
  getAllCategories({getState, setState}: StateContext<CategoryStateModel>) {
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

  @Action(DeleteCategory)
  deleteCategory({getState, setState}: StateContext<CategoryStateModel>, action: DeleteCategory) {
    return this.categoryService.deleteCategory(action.id)
      .pipe(tap(() => {
        const state = getState();
        const filteredArray = state.categories.filter(cat => cat.id !== action.id);
        setState({
          ...state,
          categories: filteredArray
        });
      }));
  }

  @Action(EditCategory)
  editCategory({getState, setState}: StateContext<CategoryStateModel>, action: EditCategory) {
    return this.categoryService.editCategory(action.category).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          category: result
        });
      })
    );
  }

  @Action(GetCategory)
  getCategory({getState, setState}: StateContext<CategoryStateModel>, action: GetCategory) {
    return this.categoryService.getCategory(action.id).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          category: result
        });
      })
    );
  }

  @Action(Logout)
  logout({setState}: StateContext<CategoryStateModel>) {
    setState({
      categories: [],
      category: undefined,
      categoryTopics: []
    });
  }
}
