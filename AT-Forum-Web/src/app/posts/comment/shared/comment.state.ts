import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CommentService} from './comment.service';
import {CreateComment, DeleteComment, EditComment, GetComment} from './comment.action';
import {Comment} from '../../shared/comment';
import {tap} from 'rxjs/operators';

export class CommentStateModel {
  comments: Comment[];
  comment: Comment;
}

@State<CommentStateModel>({
  name: 'comment',
  defaults: {
    comments: [],
    comment: undefined
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

  @Selector()
  static comment(state: CommentStateModel) {
    return state.comment;
  }

  @Action(GetComment)
  getComment({getState, setState}: StateContext<CommentStateModel>, action: GetComment) {
    return this.commentService.getComment(action.id)
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            comment: result
          });
        })
      );
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

  @Action(EditComment)
  editComment({getState, setState}: StateContext<CommentStateModel>, action: EditComment) {
    return this.commentService.editComment(action.comment)
      .pipe(tap((result) => {
          const state = getState();
          setState({
            ...state,
            comment: result
          });
        })
      );
  }
}
