import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from './auth.service';
import {ChangePassword, GetRole, GetRoles, LoginWithEmail, Logout, SetRole, SignUp} from './auth.action';
import {Role} from '../../users/shared/role';
import {tap} from 'rxjs/operators';
import {AuthUser} from './auth-user';
import {GetUser} from '../../users/shared/user.action';
import {Router} from '@angular/router';

export class AuthStateModel {
  loggedInUser: AuthUser;
  role: Role;
  roles: Role[];
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: undefined,
    role: undefined,
    roles: []
  }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService, private router: Router) {
  }

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }

  @Selector()
  static roles(state: AuthStateModel) {
    return state.roles;
  }

  @Selector()
  static role(state: AuthStateModel) {
    return state.role;
  }

  @Action(LoginWithEmail)
  loginWithEmail({getState, setState, dispatch}: StateContext<AuthStateModel>, action: LoginWithEmail) {
    return this.authService.loginWithEmail(action.email, action.password)
      .pipe(tap((result) => {
        const state = getState();
        setState({
          ...state,
          loggedInUser: result
        });
        dispatch(new GetRole(result.uid));
        dispatch(new GetUser(result.uid));
        this.router.navigateByUrl('');
      }));
  }

  @Action(GetRoles)
  getRoles({getState, setState, dispatch}: StateContext<AuthStateModel>) {
    return this.authService.getRoles()
      .pipe(tap((result) => {
        const state = getState();
        setState({
          ...state,
          roles: result
        });
      }));
  }

  @Action(Logout)
  logout({getState, setState}: StateContext<AuthStateModel>) {
    return this.authService.logout()
      .pipe(tap(() => {
        const state = getState();
        setState({
          ...state,
          loggedInUser: undefined,
          role: undefined,
          roles: undefined
        });
        this.router.navigateByUrl('');
      }));
  }

  @Action(SignUp)
  signUp({getState, setState, dispatch}: StateContext<AuthStateModel>, action: SignUp) {
    return this.authService.signUp(action.user, action.password)
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            loggedInUser: result
          });
          dispatch(new SetRole(result.uid, 'user'));
          dispatch(new GetUser(result.uid));
          dispatch(new GetRole(result.uid));
          this.router.navigateByUrl('user/profile/' + result.uid);
        }));
  }

  @Action(GetRole)
  getRole({getState, setState, dispatch}: StateContext<AuthStateModel>, action: GetRole) {
    return this.authService.getRole(action.uid)
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            role: result
          });
        }));

  }

  @Action(SetRole)
  setRole({dispatch}: StateContext<AuthStateModel>, action: SetRole) {
    return this.authService.setRole(action.uid, action.newRoleName);
  }

  @Action(ChangePassword)
  changePassword({getState, setState}: StateContext<AuthStateModel>, action: ChangePassword) {
    return this.authService.changePassword(action.newPassword);
  }

}
