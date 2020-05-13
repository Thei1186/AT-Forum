import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TopicState} from '../shared/topic.state';
import {Observable} from 'rxjs';
import {Topic} from '../../shared/topic';
import {ActivatedRoute, Router} from '@angular/router';
import {GetTopic} from '../shared/topic.action';
import {CommentState} from '../../comment/shared/comment.state';
import {Comment} from '../../shared/comment';
import {AuthState} from '../../../auth/shared/auth.state';
import {AuthUser} from '../../../auth/shared/auth-user';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  @Select(TopicState.topic) topic$: Observable<Topic>;
  @Select(CommentState.comments) comments$: Observable<Comment[]>;
  @Select(AuthState.loggedInUser) authUser$: Observable<AuthUser>;
  id: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetTopic(this.id));
  }

  goToCreateComment(id: any) {
    this.router.navigateByUrl('posts/create-comment/' + id);
  }

  deleteComment(id: string) {

  }

  goToEditComment(id: string) {

  }
}
