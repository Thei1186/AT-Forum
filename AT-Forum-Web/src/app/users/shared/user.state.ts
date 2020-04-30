import {User} from './user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {tap} from 'rxjs/operators';
import {DeleteUser, GetUser} from './user.action';

export class UserStateModel {
  currentUser: User;
  allUsers: User[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: undefined,
    allUsers: []
  }
})

@Injectable()
export class UserState {

  constructor(private userService: UserService) {
  }

  @Selector()
  static currentUser(state: UserStateModel) {
    return state.currentUser;
  }

  @Selector()
  static allUsers(state: UserStateModel) {
    return state.allUsers;
  }

  @Action(DeleteUser)
  deleteUser({getState, setState}: StateContext<UserStateModel>, {uid}: DeleteUser) {
    return this.userService.deleteUser(uid)
      .pipe(tap(() => {
        const state = getState();
        const filteredArray = state.allUsers.filter(user => user.uid !== uid);
        setState({
          ...state,
          allUsers: filteredArray
        });
      }));
  }

  @Action(GetUser)
  getUser({getState, setState}: StateContext<UserStateModel>, {uid}: GetUser) {
    return this.userService.getUser(uid).pipe(
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