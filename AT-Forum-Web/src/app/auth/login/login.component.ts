import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {User} from '../../users/shared/user';
import {LoginWithEmail, SignUp} from '../shared/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  newLoginForm: FormGroup;
  password: string;
  email: string;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit() {
    this.newLoginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  login() {
    this.email = this.newLoginForm.get('email').value;
    this.password = this.newLoginForm.get('password').value;
    console.log(this.email, this.password);
    this.store.dispatch(new LoginWithEmail(this.email, this.password));
  }
}
