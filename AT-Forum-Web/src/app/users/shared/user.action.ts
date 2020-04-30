import {User} from "./user";

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
