import {Component, OnInit} from '@angular/core';
import {AuthState} from '../../../auth/shared/auth.state';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Role} from '../../../users/shared/role';
import {CategoryState} from '../shared/category.state';
import {Topic} from '../../shared/topic';
import {ActivatedRoute, Router} from '@angular/router';
import {GetCategory} from '../shared/category.action';
import {Category} from '../../shared/category';
import {
  DeleteTopic,
  GetNextTopicsFromCategoryWithPaging, GetPrevTopicsFromCategoryWithPaging,
  GetTopicsFromCategoryWithPaging
} from '../../topic/shared/topic.action';
import {AuthUser} from '../../../auth/shared/auth-user';
import {SetFavoriteTopic} from '../../../users/shared/user.action';
import {TopicState} from '../../topic/shared/topic.state';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  @Select(AuthState.role) role$: Observable<Role>;
  @Select(TopicState.topics) topics$: Observable<Topic[]>;
  @Select(TopicState.isFirstTopic) isFirstTopic$: Observable<boolean>;
  @Select(TopicState.isLastTopic) isLastTopic$: Observable<boolean>;
  @Select(AuthState.loggedInUser) user$: Observable<AuthUser>;
  @Select(CategoryState.category) category$: Observable<Category>;
  id: string;
  limit = 5;

  constructor(private store: Store, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetCategory(this.id));
    this.store.dispatch(new GetTopicsFromCategoryWithPaging(this.limit, this.id));
    // this.store.dispatch(new GetAllTopicsFromCategory(this.id));
  }

  deleteTopic(id: string) {
    this.store.dispatch(new DeleteTopic(id));
  }

  goToEditTopic(id: string) {
    this.router.navigateByUrl('posts/edit-topic/' + id);
  }

  goToCreateTopic(id: string) {
    this.router.navigateByUrl('posts/create-topic/' + id);
  }

  goToComments(id: string) {
    this.router.navigateByUrl('posts/topic-details/' + id);
  }

  markAsFavorite(topic: Topic, user: AuthUser) {
    this.store.dispatch(new SetFavoriteTopic(topic, user.uid));
  }

  goToNextPage() {
    this.store.dispatch(new GetNextTopicsFromCategoryWithPaging(this.limit, this.id));
  }

  goToPrevPage() {
    this.store.dispatch(new GetPrevTopicsFromCategoryWithPaging(this.limit, this.id));
  }
}
