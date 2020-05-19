import {Injectable} from '@angular/core';
import {User} from '../../users/shared/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, pipe} from 'rxjs';
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

  /*
  updateAuthProfile(user: User): Observable<AuthUser> {
    return from(this.angularFireAuth.auth.currentUser.updateProfile({
      displayName: user.username,
      photoURL: user.photoURL
    })).pipe(map( () => {
      return this.angularFireAuth.auth.currentUser as AuthUser;
    }));
  }
   */

  logout(): Observable<void> {
    return from(this.angularFireAuth.auth.signOut());
  }

  signUp(user: User, password: string): Observable<AuthUser> {
    return from(this.angularFireAuth.auth
      .createUserWithEmailAndPassword(user.email, password))
      .pipe(map((cred) => {
        this.afs.collection('users').doc(cred.user.uid).set(user);
        const newUser: AuthUser = {
          uid: cred.user.uid,
          displayName: user.username,
          email: user.email,
          photoURL: user.photoURL,
        };
        this.angularFireAuth.auth.currentUser.updateProfile({
          displayName: user.username,
          photoURL: user.photoURL
        });
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
          return {
            roleName: value.data().roleName,
            uid: value.id
          };
        }));
  }

  setRole(id: string, newRoleName: string): Observable<void> {
    return from(this.afs.collection('roles').doc(id).set({
      roleName: newRoleName
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

  getRoles(): Observable<Role[]> {
    return this.afs.collection<Role>('roles')
      .snapshotChanges()
      .pipe(
        map(docActions => {
          return docActions.map(docAction => {
            const data = docAction.payload.doc.data();
            const role: Role = {
              roleName: data.roleName,
              uid: docAction.payload.doc.id
            };
            return role;
          });
        }));
  }

  changePassword(newPassword: string): Observable<void> {
    return from(this.angularFireAuth.auth.currentUser.updatePassword(newPassword));
  }
}
