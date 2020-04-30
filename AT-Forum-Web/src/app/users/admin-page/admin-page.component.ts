import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../shared/user.state';
import {Observable} from 'rxjs';
import {User} from '../shared/user';
import {DeleteUser} from "../shared/user.action";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  users: User[];
  constructor(private store: Store) { }

  @Select(UserState.allUsers) users$: Observable<User[]>;

  ngOnInit() {
  }

  deleteUser(uid: string) {
    this.store.dispatch(new DeleteUser(uid));
  }

}
