import {User} from '../../users/shared/user';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {AuthService} from './auth.service';
import {GetRole, LoginWithEmail, SetRole, SignUp} from './auth.action';
import {Role} from '../../users/shared/role';
import {tap} from 'rxjs/operators';
import {AuthUser} from './auth-user';
import {GetUser} from '../../users/shared/user.action';

export class AuthStateModel {
  loggedInUser: AuthUser;
  role: Role;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: undefined,
    role: undefined
  }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService) {
  }

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
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
        }));
  }

  /*
  @Action(UpdateAuthProfile)
  updateAuthProfile({getState, setState}: StateContext<AuthStateModel>, action: UpdateAuthProfile) {
  return this.authService.updateAuthProfile(action.user)
    .pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          loggedInUser: result
        });
      })
    );
  }

   */
  @Action(GetRole)
  getRole({getState, setState}: StateContext<AuthStateModel>, action: GetRole) {
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
  setRole({getState, setState}: StateContext<AuthStateModel>, action: SetRole) {
    return this.authService.setRole(action.uid, action.newRoleName)
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            role: result
          });
        }));

  }


}
