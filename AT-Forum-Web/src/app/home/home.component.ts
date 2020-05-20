import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TopicState} from '../posts/topic/shared/topic.state';
import {Observable} from 'rxjs';
import {Topic} from '../posts/shared/topic';
import {GetFavorites, RemoveFavoriteTopic} from '../posts/topic/shared/topic.action';
import {AuthState} from '../auth/shared/auth.state';
import {AuthUser} from '../auth/shared/auth-user';
import {first, tap} from 'rxjs/operators';
import {FavoriteTopic} from '../posts/shared/favoriteTopic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
@Select(TopicState.favoriteTopics) favoriteTopics$: Observable<Topic[]>;
@Select(AuthState.loggedInUser) authUser$: Observable<AuthUser>;
  constructor(private store: Store) { }

  ngOnInit() {
    this.authUser$.pipe(first(),
      tap((user) => {
        if (user) {
          this.store.dispatch(new GetFavorites(user.uid));
        }
    })).subscribe();
  }

  removeFavoriteTopic(topic: Topic, userUid: string) {
    this.store.dispatch(new RemoveFavoriteTopic(topic, userUid));
  }
}
