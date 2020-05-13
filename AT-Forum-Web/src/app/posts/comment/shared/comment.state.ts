import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CommentService} from './comment.service';
import {CreateComment, GetAllComments} from './comment.action';
import {Comment} from '../../shared/comment';
import {tap} from "rxjs/operators";

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

  @Action(GetAllComments)
  getAllComments({getState, setState}: StateContext<CommentStateModel>) {
    return this.commentService.getAllComments()
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            comments: result
          });
        }));
  }

  @Action(CreateComment)
  createComment({getState, setState}: StateContext<CommentStateModel>, action: CreateComment) {
    return this.commentService.createComment(action.comment);
  }
}
