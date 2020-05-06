import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CategoryState} from './shared/category.state';
import {Observable} from 'rxjs';
import {Category} from '../shared/category';
import {DeleteCategory, GetAllCategories} from './shared/category.action';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
@Select(CategoryState.categories) categories$: Observable<Category[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetAllCategories());
  }

  deleteCat(id: string) {
    this.store.dispatch(new DeleteCategory(id));
  }
}
