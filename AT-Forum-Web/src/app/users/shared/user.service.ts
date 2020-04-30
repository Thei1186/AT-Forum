import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user';
import {from} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  deleteUser(uid: string) {
    return from (this.afs.collection('users').doc<User>(uid).delete());
  }
}
