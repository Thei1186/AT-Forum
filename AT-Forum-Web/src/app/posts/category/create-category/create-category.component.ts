import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {Category} from '../../shared/category';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreateCategory} from '../shared/category.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  newCategoryForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder,
              private router: Router) {
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
