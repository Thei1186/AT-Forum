import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {User} from '../shared/user';
import {AuthState} from '../../auth/shared/auth.state';
import {GetUser} from '../../auth/shared/auth.action';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  constructor(private store: Store, private route: ActivatedRoute) { }
  @Select(AuthState.currentUser) auth$: Observable<User>;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetUser(this.id));
    this.auth$.subscribe(user => {
      if (!user) {
        return;
      }
    });
  }

}
