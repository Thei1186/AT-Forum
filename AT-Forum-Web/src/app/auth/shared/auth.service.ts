import {Injectable} from '@angular/core';
import {User} from '../../users/shared/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';

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
