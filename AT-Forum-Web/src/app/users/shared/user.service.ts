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
    console.log('deleted user ' + uid);
    return from (this.afs.collection('users').doc<User>(uid).delete());
  }

  getUser(uid: string): Observable<User> {
    return this.afs.collection('users').doc<User>(uid)
      .snapshotChanges().pipe(map(user => {
        const data = user.payload.data();
        const currentUser: User = {
          uid: user.payload.id,
          name: data.name,
          username: data.username,
          email: data.email,
          photoURL: data.photoURL,
        };
        return currentUser;
      }));
  }

  getAllUsers(): Observable<User[]> {
    return this.afs.collection<User>('users')
      .snapshotChanges().pipe(
        map(doc => {
          const userArray: User[] = [];
          doc.forEach(document => {
            const user = document.payload.doc.data();
            console.log('id ' + document.payload.doc.id);
            userArray.push({
              uid: document.payload.doc.id,
              email: user.email,
              name: user.name,
              username: user.username,
              photoURL: user.photoURL,
            });
          });
          return userArray;
        })
      );
  }
}
