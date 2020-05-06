import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CategoryState} from './shared/category.state';
import {Observable} from 'rxjs';
import {Category} from '../shared/category';
import {DeleteCategory, GetAllCategories, GetCategory} from './shared/category.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
@Select(CategoryState.categories) categories$: Observable<Category[]>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetAllCategories());
  }

  deleteCat(id: string) {
    this.store.dispatch(new DeleteCategory(id));
  }

  editCategory(id: string) {
    this.router.navigateByUrl('posts/edit-category/' + id);
  }
}
