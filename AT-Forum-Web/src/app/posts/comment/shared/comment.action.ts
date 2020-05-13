import {Comment} from '../../shared/comment';

export class CreateComment {
  static readonly type = '[comment] CreateComment';
  constructor(public comment: Comment) {
  }
}

export class GetAllComments {
  static readonly type = '[Comment] GetAllComments';
  constructor() {
  }
}
