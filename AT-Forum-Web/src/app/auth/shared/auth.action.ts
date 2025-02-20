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

export class SetRole {
  static readonly type = '[Auth] SetRole';

  constructor(public uid: string, public newRoleName: string) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class ChangePassword {
  static readonly type = '[Auth] ChangePassword';

  constructor(public newPassword: string) {
  }
}

export class GetRoles {
  static readonly type = '[Auth] GetRoles';
}

/*
export class UpdateAuthProfile {
  static readonly  type = '[Auth] UpdateAuthProfile';

  constructor(public user: User) {
  }
}

 */
