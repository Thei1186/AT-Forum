import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../shared/user.state';
import {Observable} from 'rxjs';
import {User} from '../shared/user';
import {DeleteUser, GetAllUsers} from '../shared/user.action';
import {AuthState} from '../../auth/shared/auth.state';
import {AuthUser} from '../../auth/shared/auth-user';
import {Role} from '../shared/role';
import {GetRoles, SetRole} from '../../auth/shared/auth.action';

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
  @Select(AuthState.role) role$: Observable<Role>;
  roleChange: string;

  ngOnInit() {
    this.store.dispatch(new GetAllUsers());
    this.store.dispatch(new GetRoles());
  }

  deleteUser(uid: string) {
    this.store.dispatch(new DeleteUser(uid));
  }

  getRole(uid: string, roles: Role[]) {
    const roleFound = roles.filter(role => role.uid === uid);
    if (roleFound.length > 0) {
      if (roleFound[0].roleName === 'admin') {
        this.roleChange = 'Demote';
      } else if (roleFound[0].roleName === 'user') {
        this.roleChange = 'Promote';
      }
      return roleFound[0].roleName;
    }
  }
  checkPermissions(uid: string, roles: Role[], currentUserRole: Role) {
    const checkedUserRoleName = this.getRole(uid, roles);
    if (currentUserRole.roleName === 'superAdmin' && checkedUserRoleName !== 'superAdmin') {
      return true;
    } else {
      return currentUserRole.roleName === 'admin' && checkedUserRoleName === 'user';
    }
  }
  changeRole(uid: string, roles: Role[]) {
    const roleName = this.getRole(uid, roles);
    if (roleName === 'admin') {
      this.store.dispatch(new SetRole(uid, 'user'));
    } else {
      this.store.dispatch(new SetRole(uid, 'admin'));
    }
  }
}
