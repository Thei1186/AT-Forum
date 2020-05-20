import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CommentState} from '../shared/comment.state';
import {Observable} from 'rxjs';
import {Comment} from '../../shared/comment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EditComment, GetComment} from '../shared/comment.action';
import {first, tap} from "rxjs/operators";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  @Select(CommentState.comment) comment$: Observable<Comment>;

  editCommentForm: FormGroup;
  commentId: string;

  constructor(private store: Store, private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.editCommentForm = this.fb.group({
      message: ''
    });
    this.commentId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetComment(this.commentId));
    this.comment$.subscribe(comment => {
      if (!comment) {
        return;
      }
      this.editCommentForm.patchValue({
        message: comment.message,
      });
    });
  }

  editComment(comment: Comment) {
    const editComment: Comment = {
      id: comment.id,
      message: this.editCommentForm.get('message').value,
      author: comment.author,
      topicId: comment.topicId
    };
    this.store.dispatch(new EditComment(editComment));
  }
}


