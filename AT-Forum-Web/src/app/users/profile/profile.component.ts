import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {User} from '../shared/user';
import {AuthState} from '../../auth/shared/auth.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  @Select(AuthState.currentUser) auth$: Observable<User>;

  ngOnInit() {
  }

}
