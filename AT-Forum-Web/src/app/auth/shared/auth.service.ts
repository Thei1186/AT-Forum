import {Injectable} from '@angular/core';
import {User} from '../../users/shared/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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

  signUp(user: User, password: string): Promise<any> {
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(user.email, password)
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
}
