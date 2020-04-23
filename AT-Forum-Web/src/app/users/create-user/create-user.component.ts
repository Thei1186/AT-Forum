import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user';
import {Store} from '@ngxs/store';
import {SignUp} from '../../auth/shared/auth.action';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  newSignUpForm: FormGroup;
  user: User;
  email: string;
  name: string;
  password: string;
  constructor(private store: Store) { }

  ngOnInit() {
  }

  signUp() {
    const newUser = this.user;
    newUser.email = this.newSignUpForm.get('email').value;
    newUser.username = this.newSignUpForm.get('username').value;
    newUser.name = this.newSignUpForm.get('name').value;
    this.password = this.newSignUpForm.get('password').value;

    this.store.dispatch(new SignUp(newUser, this.password));
  }
}
