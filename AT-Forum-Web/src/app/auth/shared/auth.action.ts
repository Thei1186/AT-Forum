export class LoginWithEmail {
  static readonly type = '[Auth] LoginWithEmail';

  constructor(public email: string, public password: string) {}
}
