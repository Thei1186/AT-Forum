import { Injectable } from '@angular/core';
import {User} from '../../users/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth) { }

  signUp(user: User, password: string) {

  }
}
