import {Comment} from '../../shared/comment';

export class CreateComment {
  static readonly type = '[comment] CreateComment';
  constructor(public comment: Comment) {
  }
}

export class GetComment {
  static readonly type = '[Comment] GetComment';
  constructor(public id: string) {
  }
}

export class GetAllTopicComments {
  static readonly type = '[Comment] GetAllTopicComments';
  constructor(public id: string) {
  }
}

export class DeleteComment {
  static readonly type = '[Comment] DeleteComment';
  constructor(public id: string) {
  }
}

export class EditComment {
  static readonly type = '[Comment] EditComment';
  constructor(public comment: Comment, public topicId: string) {
  }
}
