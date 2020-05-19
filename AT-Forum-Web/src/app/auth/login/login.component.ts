import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {LoginWithEmail} from '../shared/auth.action';
import {Router} from '@angular/router';

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
  id: string;

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
    this.store.dispatch(new LoginWithEmail(this.email, this.password));
  }
}
