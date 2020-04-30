export class DeleteUser {
  static readonly type = '[User] DeleteUser';

  constructor(public uid: string) {}
}
