import {User} from '../../users/shared/user';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {AuthService} from './auth.service';
import {GetRole, GetUser, LoginWithEmail, SetRole, SignUp, UpdateAuthProfile} from './auth.action';
import {Role} from '../../users/shared/role';
import {map, tap} from 'rxjs/operators';
import {AuthUser} from './auth-user';

export class AuthStateModel {
  loggedInUser: AuthUser;
  currentUser: User;
  role: Role;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: undefined,
    currentUser: undefined,
    role: undefined
  }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService, private store: Store) {
  }

  @Selector()
  static currentUser(state: AuthStateModel) {
    return state.currentUser;
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
            currentUser: result
          });
          dispatch(new SetRole(result.uid, 'user'));
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

  @Action(GetUser)
  getUser({getState, setState}: StateContext<AuthStateModel>, {uid}: GetUser) {
    return this.authService.getUser(uid).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          currentUser: result
        });
      })
    );
  }
}
