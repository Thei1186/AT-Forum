import {User} from "./user";
import {Topic} from "../../posts/shared/topic";

export class DeleteUser {
  static readonly type = '[User] DeleteUser';

  constructor(public uid: string) {}
}

export class GetUser {
  static readonly type = '[User] GetUser';

  constructor(public uid: string) {
  }
}

export class GetAllUsers {
  static readonly type = '[User] GetAllUsers';
}

export class EditUser {
  static readonly type = '[User] EditUser';

  constructor(public user: User) {
  }
}

export class SetFavoriteTopic {
  static readonly type = '[User] SetFavoriteTopic';

  constructor(public topic: Topic, public id: string) {
  }
}
