import {Comment} from '../../shared/comment';

export class CreateComment {
  static readonly type = '[comment] CreateComment';
  constructor(public comment: Comment) {
  }
}

export class GetAllTopicComments {
  static readonly type = '[Comment] GetAllTopicComments';
  constructor(public id: string) {
  }
}
