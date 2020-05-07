import {Comment} from '../../shared/comment';

export class CreateComment {
  static readonly type = '[comment] CreateComment';

  constructor(public comment: Comment) {
  }
}
