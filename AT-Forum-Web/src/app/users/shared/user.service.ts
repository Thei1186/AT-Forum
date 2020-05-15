import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from './user';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Topic} from '../../posts/shared/topic';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) {
  }

  deleteUser(uid: string) {
    console.log('deleted user ' + uid);
    return from(this.afs.collection('users').doc<User>(uid).delete());
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

  editUser(user: User): Observable<User> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      name: user.name,
      username: user.username,
      photoURL: user.photoURL
    };
    return from(userRef.set(data as User, {merge: true}))
      .pipe(
        map(() => {
            const updatedUser: User = {
              uid: user.uid,
              name: user.name,
              username: user.username,
              photoURL: user.photoURL,
              email: user.email
            };
            return updatedUser;
          }
        ));
  }

  setFavoriteTopic(topic: Topic, uid: string): Observable<void> {
     const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
     return from(this.afs.collection('favoriteTopics').doc(uid).set({
       favoriteTopics: arrayUnion(topic)
     }, {merge: true}));
  }
}
