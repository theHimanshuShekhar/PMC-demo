import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

interface User {
  uid?: string;
  email?: string;
  userName?: string;
  joinDate?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  userCollection: AngularFirestoreCollection<User>;
  userObs: Observable<any>;

  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;

  private profileusername: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    /// Get User and Auth data
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });

    // Get Auth data, then get firestore user document || null
    this.afAuth.authState.subscribe(authState => {
      if (authState) {
        this.user = this.afs.doc<User>(`users/${authState.uid}`).valueChanges();
      }
    });
  }

  getAuth() {
    return this.afAuth.auth;
  }


  getAuthState() {
    return this.afAuth.authState;
  }
  emailLogin(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.afs.doc('users/' + credential.user.uid).valueChanges().subscribe(
          user => {
            if (user) {
              this.router.navigateByUrl('/home');
            } else {
              this.afAuth.auth.signOut()
                .then(() => this.router.navigateByUrl('/signup'));
            }
          });
      });
  }

  register(userdata) {
    if (userdata.type === 'google') {
      this.googleRegister(userdata);
    }
    if (userdata.type === 'email') {
      this.emailRegister(userdata);
    }
  }

  emailRegister(formdata) {
    return this.afAuth.auth.createUserWithEmailAndPassword(formdata.email, formdata.password)
      .then(() => {
        this.getAuthState().subscribe(user => {
          if (user) {
            const userData = {
              uid: user.uid,
              email: user.email,
              userName: formdata.username ? formdata.username : 'username',
              password: formdata.password,
              joinDate: new Date()
            };
            this.updateUserData(userData);
          }
        });
      });
  }

  private googleRegister(formdata) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => {
        const user = credential.user;
        const userData = {
          uid: user.uid,
          email: user.email,
          userName: formdata.username,
          password: formdata.password,
          joinDate: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.updateUserData(userData);
      });
  }

  private updateUserData(user) {

    // check if user already exists
    this.userCollection = this.afs.collection('users', ref => ref.where('uid', '==', user.uid));
    this.userObs = this.userCollection.valueChanges();
    this.userObs.forEach(userobj => {
      console.log('Existing User logged in- ', userobj[0].userName);
    })
      .then(
        (success) => {
          this.router.navigateByUrl('/');
        })
      .catch(
        (err) => {
          // setup user data in firestore on login
          console.log('New User login.\nSetting up user in database.');
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

          const data: User = {
            uid: user.uid,
            email: user.email,
            userName: user.userName,
            joinDate: firebase.firestore.FieldValue.serverTimestamp()
          };
          // if (this.afAuth.auth.currentUser) {
          //   this.getAuth().currentUser.sendEmailVerification().then(() => {
          //     this.logout();
          //   });
          // }
          return userRef.set(data);
        });
  }

  logout() {
    this.afAuth.auth.signOut().then(
      () => {
        console.log('User logged out successfully.');
        this.router.navigateByUrl('/login');
      });
  }

  // Check if user is logged in or not
  checkNotLogin() {
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.router.navigateByUrl('/');
        }
      });
  }

  checkLogin() {
    this.afAuth.authState.subscribe(
      user => {
        if (!user) {
          this.router.navigateByUrl('/');
        }
      });
  }

  getUsers() {
    return this.afs.collection('users').valueChanges();
  }

  checkAdmin(uid) {
    return this.afs.collection('admin', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  checkSuperAdmin(uid) {
    return this.afs.collection('super-admin', ref => ref.where('uid', '==', uid)).valueChanges();
  }
}
