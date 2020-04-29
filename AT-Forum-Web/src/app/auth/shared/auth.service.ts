import {Injectable} from '@angular/core';
import {User} from '../../users/shared/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, pipe} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {AuthUser} from './auth-user';
import {Role} from '../../users/shared/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private afs: AngularFirestore) {
  }

  signUp(user: User, password: string): Observable<any> {
    return from(this.angularFireAuth.auth
      .createUserWithEmailAndPassword(user.email, password))
      .pipe(map((cred) => {
        const newUser = {
          name: user.name,
          username: user.username,
          email: user.email,
          photoURL: user.photoURL
        };
        this.afs.collection('users').doc(cred.user.uid).set(newUser);
        return newUser;
      }));

    /*
    .then(res => {
      this.afs.collection('users').doc(res.user.uid).set({
        email: user.email,
        username: user.username,
        photoUrl: user.photoURL,
        name: user.name,
        role: 'user'
      });
      this.angularFireAuth.auth.currentUser.updateProfile({
        displayName: user.username,
        photoURL: user.photoURL
      });
      console.log('You are Successfully signed up!', res);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
    });

     */
  }

  loginWithEmail(email: string, password: string): Observable<AuthUser> {
    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        map(credentials => this.firebaseUserToAuthUser(credentials.user))
      );
  }

  getRole(uid: string): Observable<Role> {
    return this.afs.collection('roles').doc(uid).get()
      .pipe(
        map(value => {
          return value.data().role;
        }));
  }

  private firebaseUserToAuthUser(user: firebase.User): AuthUser {
    if (user) {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
    }
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
          role: data.role
        };
        return currentUser;
      }));
  }
}
