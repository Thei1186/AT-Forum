import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CategoryState} from '../../shared/states/category.state';
import {Observable} from 'rxjs';
import {Category} from '../../shared/category';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreateCategory} from '../../shared/states/category.action';

@Component({
  selector: 'app-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  @Select(CategoryState.categories) categories$: Observable<Category[]>;
  newCategoryForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.newCategoryForm = this.fb.group({
      catName: '',
      description: ''
    });
  }

  CreateCategory() {
    const categoryFromForm = this.newCategoryForm.value;
    const newCategory = {
      categoryName: categoryFromForm.catName,
      description: categoryFromForm.description
    };
    this.store.dispatch(new CreateCategory(newCategory as Category));
  }
}
