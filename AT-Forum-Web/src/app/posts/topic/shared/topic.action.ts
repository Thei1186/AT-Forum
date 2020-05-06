import {Topic} from '../../shared/topic';

export class CreateTopic {
  static readonly type = '[Topic] CreateTopic';
  constructor(public topic: Topic) {
  }
}

export class GetAllTopics {
  static readonly type = '[Topic] GetAllTopics';
}
