import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as firebase from 'firebase/app';
import { User } from '../models/User'
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(public afStore: AngularFirestore, public ngFireAuth: AngularFireAuth, ) { }

  setItemData(item: Item) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = JSON.parse(localStorage.getItem('user'));
      this.afStore.collection('items').doc(currentUser.uid).collection('item').add(item)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  getItemsData() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    return new Promise<any>((resolve, reject) => {
      this.afStore.collection('items').doc(currentUser.uid).collection('item').get()
        .subscribe((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })
          resolve(tempDoc)
        }, err => reject(err)
        );
    })
  }

  userDetails() {
    // return this.ngFireAuth.user
    let currentUser = JSON.parse(localStorage.getItem('user'));
    return new Promise<any>((resolve, reject) => {
      this.afStore.collection('users').doc(currentUser.uid).get()
      .subscribe((querySnapshot) => {
        resolve(querySnapshot.data())
      }, err => reject(err)
      );
    })
  }


  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: `${user.firstName} ${user.lastName}`,
      firstName: `${user.firstName}`,
      lastName: user.lastName,
      gender: user.gender[0],
      phoneNumber: user.phoneNumber,
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}
