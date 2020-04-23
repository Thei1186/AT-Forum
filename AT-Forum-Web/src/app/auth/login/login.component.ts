import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {User} from '../../users/shared/user';
import {SignUp} from '../shared/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newLoginForm: FormGroup;
  user: User;
  username: string;
  password: string;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit() {

  }

  login() {
  
  }
}
