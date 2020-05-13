import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CommentService} from './comment.service';
import {CreateComment, DeleteComment} from './comment.action';
import {Comment} from '../../shared/comment';
import {tap} from 'rxjs/operators';

export class CommentStateModel {
  comments: Comment[];
}

@State<CommentStateModel>({
  name: 'comment',
  defaults: {
    comments: [],
  }
})
@Injectable()
export class CommentState {
  constructor(private commentService: CommentService) {
  }

  @Selector()
  static comments(state: CommentStateModel) {
    return state.comments;
  }

  @Action(CreateComment)
  createComment({getState, setState}: StateContext<CommentStateModel>, action: CreateComment) {
    return this.commentService.createComment(action.comment);
  }

  @Action(DeleteComment)
  deleteComment({getState, setState}: StateContext<CommentStateModel>, action: DeleteComment) {
    return this.commentService.deleteComment(action.id)
      .pipe(
        tap(() => {
          const state = getState();
          const filteredArray = state.comments.filter(comment => comment.id !== action.id);
          setState({
            ...state,
            comments: filteredArray
          });
        })
      );
  }
}
