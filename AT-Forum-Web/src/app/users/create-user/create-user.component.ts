import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user';
import {Store} from '@ngxs/store';
import {SignUp} from '../../auth/shared/auth.action';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  newSignUpForm: FormGroup;
  password: string;

  constructor(private store: Store, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.newSignUpForm = this.fb.group({
      email: '',
      username: '',
      name: '',
      password: '',
      photoURL: ''
    });
  }

  async signUp() {
    const userFromForm = this.newSignUpForm.value;
    const newUser = {
      name: userFromForm.name,
      email: userFromForm.email,
      username: userFromForm.username,
      photoURL: userFromForm.photoURL,
      role: 'user'
    };
    this.password = this.newSignUpForm.get('password').value;

    this.store.dispatch(new SignUp(newUser as User, this.password));
    await this.router.navigateByUrl('/user/profile');
  }
}
