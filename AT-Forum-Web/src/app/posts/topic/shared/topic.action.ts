import {Topic} from '../../shared/topic';

export class CreateTopic {
  static readonly type = '[Topic] CreateTopic';
  constructor(public topic: Topic) {
  }
}

export class GetAllTopicsFromCategory {
  static readonly type = '[Topic] GetAllTopics';
  constructor(public catId: string) {
  }
}

export class GetTopic {
 static readonly type = '[Topic] GetTopic';
 constructor(public id: string) {
 }
}

export class DeleteTopic {
  static readonly type = '[Topic] DeleteTopic';
  constructor(public id: string) {
  }
}

export class EditTopic {
  static readonly type = '[Topic] EditTopic';
  constructor(public topic: Topic) {
  }
}

export class GetFavorites {
  static readonly type = '[Topic] GetFavorites';
  constructor(public id: string) {
  }
}

export class RemoveFavoriteTopic {
  static readonly type = '[Topic] RemoveFavoriteTopic';
  constructor(public topic: Topic, public userUid: string) {
  }
}
