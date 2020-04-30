import {User} from '../../users/shared/user';

export class LoginWithEmail {
  static readonly type = '[Auth] LoginWithEmail';

  constructor(public email: string, public password: string) {
  }
}

export class SignUp {
  static readonly type = '[Auth] SignUp';

  constructor(public user: User, public password: string) {
  }
}

export class GetRole {
  static readonly type = '[Auth] GetRole';

  constructor(public uid: string) {
  }
}
