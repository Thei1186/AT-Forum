import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryState} from '../shared/category.state';
import {Observable} from 'rxjs';
import {Category} from '../../shared/category';
import {EditCategory, GetCategory} from '../shared/category.action';

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
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.editCategoryForm = this.fb.group({
      catName: '',
      description: ''
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetCategory(this.id));
    this.category$.subscribe(cat => {
      if (!cat) {
        return;
      }

      this.editCategoryForm.patchValue({
        catName: cat.categoryName,
        description: cat.description,
      });
    });
  }

  editCategory(category: Category) {
    const newCat: Category = {
      id: category.id,
      categoryName: this.editCategoryForm.get('catName').value,
      description: this.editCategoryForm.get('description').value,
      topics: category.topics
    };
    this.store.dispatch(new EditCategory(newCat));
  }
}
