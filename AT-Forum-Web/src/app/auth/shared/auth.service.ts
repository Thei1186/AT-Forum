import {Injectable} from '@angular/core';
import {User} from '../../users/shared/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private afs: AngularFirestore) {
  }

  signUp(user: User, password: string): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, password)
      .then(credentials => {
          const newUser: User = {
            uid: credentials.user.uid,
            name: user.name,
            email: user.email,
            username: user.username,
            photoURL: user.photoURL,
            role: user.role
          };
          this.afs.collection('users').doc(newUser.uid).set(newUser)
            .then(() => {
              this.angularFireAuth.auth.currentUser.updateProfile({
                displayName: newUser.username,
                photoURL: newUser.photoURL
              });
            });
          console.log('Signup successful for ' + newUser.username);
          return newUser;
        })
      .catch(err => {
        console.log(err.message);
      });
    /*
    return new Promise<User>(() => {
    this.angularFireAuth
        .auth
        .createUserWithEmailAndPassword(user.email, password)
        .then(res => {
          const newUser = res.user;
          this.afs.collection('users').doc(newUser.uid).set({
            email: newUser.email,
            username: user.username,
            name: user.name
          }).then(() => {
            this.angularFireAuth.auth.currentUser.updateProfile({
              displayName: user.username,
              photoURL: user.photoURL
            });
            console.log('Sign up successful!', res);
          });
    }).catch(err => {
      console.log('Something went wrong: ', err.message);
    });
    });
     */
  }
}
