import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {User} from '../shared/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserState} from '../shared/user.state';
import {GetUser} from '../shared/user.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  constructor(private store: Store, private router: Router,
              private route: ActivatedRoute) {
  }

  @Select(UserState.currentUser) user$: Observable<User>;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetUser(this.id));
  }

  editUserRoute(id: string) {
    this.router.navigateByUrl('user/edit-user/' + id);
  }
}
