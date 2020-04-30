export class DeleteUser {
  static readonly type = '[User] DeleteUser';

  constructor(public uid: string) {}
}

export class GetUser {
  static readonly type = '[User] GetUser';
  constructor(public uid: string) {
  }
}
