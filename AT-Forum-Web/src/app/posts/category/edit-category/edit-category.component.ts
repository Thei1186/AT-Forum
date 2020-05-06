import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {CategoryState} from '../shared/category.state';
import {Observable} from 'rxjs';
import {Category} from '../../shared/category';
import {EditCategory} from "../shared/category.action";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @Select(CategoryState.category) category$: Observable<Category>;

  editCategoryForm: FormGroup;
  id: string;

  constructor(private store: Store, private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.editCategoryForm = this.fb.group({
      catName: '',
      description: ''
    });
    this.category$.subscribe(cat => {
      if (!cat) {
        return;
      }
      this.id = cat.id;

      this.editCategoryForm.patchValue({
        categoryName: cat.categoryName,
        description: cat.description,
      });
    });
  }

  editCategory(category: any) {
    const newCat: Category = {
      id: category.id,
      categoryName: this.editCategoryForm.get('catName').value,
      description: this.editCategoryForm.get('description').value,
      topic: category.topic
    };
    this.store.dispatch(new EditCategory(newCat));
  }
}
