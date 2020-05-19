import {User} from './user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {tap} from 'rxjs/operators';
import {DeleteUser, EditUser, GetAllUsers, GetUser, SetFavoriteTopic} from './user.action';
import {from} from 'rxjs';
import {Topic} from '../../posts/shared/topic';
import {Logout} from '../../auth/shared/auth.action';
import {CategoryStateModel} from '../../posts/category/shared/category.state';

export class UserStateModel {
  currentUser: User;
  allUsers: User[];
  favoriteTopics: Topic[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: undefined,
    allUsers: [],
    favoriteTopics: []
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

  @Action(GetAllUsers)
  getAllUsers({getState, setState}: StateContext<UserStateModel>) {
    return this.userService.getAllUsers().pipe(
      tap((result => {
        const state = getState();
        setState({
          ...state,
          allUsers: result
        });
      }))
    );
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

  @Action(EditUser)
  editUser({setState, getState}: StateContext<UserStateModel>, action: EditUser) {
    return this.userService.editUser(action.user).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          currentUser: result
        });
      })
    );
  }


  @Action(SetFavoriteTopic)
  setFavoriteTopic({setState, getState}: StateContext<UserStateModel>, action: SetFavoriteTopic) {
    return this.userService.setFavoriteTopic(action.topic, action.id);
  }

  @Action(Logout)
  logout({setState}: StateContext<UserStateModel>) {
    setState({
      currentUser: undefined,
      allUsers: [],
      favoriteTopics: []
    });
  }
}
