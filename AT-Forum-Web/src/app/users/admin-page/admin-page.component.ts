import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../shared/user.state';
import {Observable, pipe} from 'rxjs';
import {User} from '../shared/user';
import {DeleteUser, GetAllUsers} from '../shared/user.action';
import {AuthState} from '../../auth/shared/auth.state';
import {AuthUser} from '../../auth/shared/auth-user';
import {Role} from '../shared/role';
import {map} from 'rxjs/operators';
import {GetRoles} from '../../auth/shared/auth.action';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private store: Store) {
  }

  @Select(UserState.allUsers) users$: Observable<User[]>;
  @Select(AuthState.roles) roles$: Observable<Role[]>;
  @Select(AuthState.loggedInUser) user$: Observable<AuthUser>;

  ngOnInit() {
    this.store.dispatch(new GetAllUsers());
    this.store.dispatch(new GetRoles());
  }

  deleteUser(uid: string) {
    this.store.dispatch(new DeleteUser(uid));
  }

   isUser(user: User, roles: Role[]) {
    const roleFound = roles.filter(role => role.uid === user.uid);
    if (roleFound.length > 0) {
      return roleFound[0].roleName === 'user';
    }
  }
}
