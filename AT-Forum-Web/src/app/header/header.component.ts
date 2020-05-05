import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {User} from '../users/shared/user';
import {GetUser} from '../auth/shared/auth.action';
import {Role} from '../users/shared/role';
import {AuthUser} from '../auth/shared/auth-user';
import {Router} from '@angular/router';
import {GetUser} from '../users/shared/user.action';
import {Logout} from "../auth/shared/auth.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store) { }
  @Select(AuthState.currentUser) user$: Observable<User>;

  ngOnInit() {
  }

  goToProfile(uid: string) {
    this.store.dispatch(new GetUser(uid));
    this.router.navigateByUrl('user/profile');
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
