import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {User} from '../users/shared/user';
import {GetUser} from '../auth/shared/auth.action';

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

}
