import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../../../users/shared/user.state';
import {Observable} from 'rxjs';
import {User} from '../../../users/shared/user';
import {CreateComment} from '../shared/comment.action';
import {Comment} from '../../shared/comment';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Select(UserState.currentUser) user$: Observable<User>;
  newCommentForm: FormGroup;
  topicId: string;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,
              private store: Store) { }

  ngOnInit() {
    this.newCommentForm = this.fb.group({
      header: '',
      message: ''
    });
    this.topicId = this.route.snapshot.paramMap.get('id');
  }

  CreateComment() {
    this.user$.pipe(
      map(user => {
        if (user) {
          const CommentFromForm = this.newCommentForm.value;
          const newComment = {
            header: CommentFromForm.header,
            message: CommentFromForm.message,
            author: user,
            topicId: this.topicId
          };
          this.store.dispatch(new CreateComment(newComment as Comment));
        }
      })
    ).subscribe();
  }
}
