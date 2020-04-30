import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  deleteUser(uid: string) {
    return from (this.afs.collection('users').doc<User>(uid).delete());
  }

  getUser(uid: string): Observable<User> {
    return this.afs.collection('users').doc<User>(uid)
      .snapshotChanges().pipe(map(user => {
        const data = user.payload.data();
        const currentUser: User = {
          uid: user.payload.id,
          username: data.username,
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
        };
        return currentUser;
      }));
  }
}
