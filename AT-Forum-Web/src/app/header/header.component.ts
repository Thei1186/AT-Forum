import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {Role} from '../users/shared/role';
import {AuthUser} from '../auth/shared/auth-user';
import {Router} from '@angular/router';
import {Logout} from '../auth/shared/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store,
              private router: Router) { }
  @Select(AuthState.loggedInUser) user$: Observable<AuthUser>;
  @Select(AuthState.role) role$: Observable<Role>;

  ngOnInit() {
  }

  goToProfile(uid: string) {
    this.router.navigateByUrl('user/profile/' + uid);
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  createCat() {
    this.router.navigateByUrl('posts/create-category');
  }
}
