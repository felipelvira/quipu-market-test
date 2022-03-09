import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from '../models/User';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService extends FirebaseService {
  userInfo: any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private router: Router
  ) {
    super(afStore, ngFireAuth);
    this.userDetails().then((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userInfo = JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        this.userInfo = JSON.parse(localStorage.getItem('user'));
      }
    }, error => {
      console.log(error)
    });
  }

  /**
   * 
   * @param email 
   * @param password 
   */

  login(value) {
    return new Promise<any>((resolve, reject) => {
      this.ngFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  /**
   * 
   * @param email 
   * @param password 
   */
  register(value) {
    let newUser: User = value;
    return new Promise<any>((resolve, reject) => {
      this.ngFireAuth.createUserWithEmailAndPassword(value.email, value.password).then((res) => {
        newUser.uid = res.user.uid;
        resolve(this.setUserData(newUser))
      }, err => reject(err))
    })
  }

  logout(){
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }


  /**
   * returns true if user is already logged in
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    return (user !== null) ? true : false;
  }

  get fbUser() {
    return JSON.parse(localStorage.getItem('user'));
  }




}
