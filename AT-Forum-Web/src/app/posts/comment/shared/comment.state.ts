import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CommentService} from './comment.service';
import {CreateComment} from './comment.action';

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
  static topics(state: CommentStateModel) {
    return state.comments;
  }

  @Action(CreateComment)
  createComment({getState, setState}: StateContext<CommentStateModel>, action: CreateComment) {
    return this.commentService.createComment(action.comment);
  }
}
