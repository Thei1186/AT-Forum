import {User} from '../../users/shared/user';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from './auth.service';
import {GetUser, SignUp} from './auth.action';
import {tap} from "rxjs/operators";

export class AuthStateModel {
  currentUser: User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    currentUser: undefined
  }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService) {}

  @Selector()
  static currentUser(state: AuthStateModel) {
    return state.currentUser;
  }

  @Action(SignUp)
  signUp({patchState}: StateContext<AuthStateModel>, action: SignUp) {
  return this.authService.signUp(action.user, action.password)
    .then((res) => {
      if (!res) {
        return;
      }
      patchState({
        currentUser: res
      });
      console.log('auth state user: ' + res);
    });
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
