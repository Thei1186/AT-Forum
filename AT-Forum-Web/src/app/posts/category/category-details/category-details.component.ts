import { Component, OnInit } from '@angular/core';
import {AuthState} from '../../../auth/shared/auth.state';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Role} from '../../../users/shared/role';
import {CategoryState} from '../shared/category.state';
import {Topic} from '../../shared/topic';
import {ActivatedRoute, Router} from '@angular/router';
import {UserState} from '../../../users/shared/user.state';
import {User} from '../../../users/shared/user';
import {GetAllCategoryTopics, GetCategory} from '../shared/category.action';
import {Category} from '../../shared/category';
import {DeleteTopic} from "../../topic/shared/topic.action";


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  @Select(AuthState.role) role$: Observable<Role>;
  @Select(CategoryState.categoryTopics) topics$: Observable<Topic[]>;
  @Select(UserState.currentUser) user$: Observable<User>;
  @Select(CategoryState.category) category$: Observable<Category>;
  id: string;

  constructor(private store: Store, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetCategory(this.id));
    this.store.dispatch(new GetAllCategoryTopics(this.id));
  }

  deleteTopic(id: string) {
  this.store.dispatch(new DeleteTopic(id));
  }

  goToEditTopic(id: string) {
  }

  goToCreateTopic(id: string) {
   this.router.navigateByUrl('posts/create-topic/' + id);
  }

  goToComments(id: string) {
    this.router.navigateByUrl('posts/topic-details/' + id);
  }
}
