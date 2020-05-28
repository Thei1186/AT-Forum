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

export class GetTopicsFromCategoryWithPaging {
  static readonly type = '[Topic] GetAllTopicsFromCategoryWithPaging';
  constructor(public limit: number, public catId: string) {
  }
}

export class GetNextTopicsFromCategoryWithPaging {
  static readonly type = '[Topic] GetNextTopicsFromCategoryWithPaging';
  constructor(public limit: number, public catId: string) {
  }
}

export class GetPrevTopicsFromCategoryWithPaging {
  static readonly type = '[Topic] GetPrevTopicsFromCategoryWithPaging';
  constructor(public limit: number, public catId: string) {
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


export class IsFirstInArray {
  static readonly type = '[Topic] IsFirstInArray';
  constructor(public topicFirstId: string, public catId: string) {
  }
}

export class IsLastInArray {
  static readonly type = '[Topic] IsLastInArray';
  constructor(public topicLastId: string, public catId: string) {
  }
}

export class UpdateNavigation {
  static readonly type = '[Topic] UpdateNavigation';
  constructor(public topicFirstId: string, public topicLastId: string, public catId: string) {
  }
}

