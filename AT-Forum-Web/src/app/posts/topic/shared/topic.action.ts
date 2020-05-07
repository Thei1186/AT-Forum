import {Topic} from '../../shared/topic';

export class CreateTopic {
  static readonly type = '[Topic] CreateTopic';
  constructor(public topic: Topic) {
  }
}

export class GetAllTopics {
  static readonly type = '[Topic] GetAllTopics';
  constructor() {
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
