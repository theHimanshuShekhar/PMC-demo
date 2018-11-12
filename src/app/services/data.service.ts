import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage,
  ) { }

  getBookings(id) {
    return this.db.collection('bookings', ref => ref.where('id', '==', id)).valueChanges();
  }

  getLocationByName(name) {
    return this.db.collection('locations', ref => ref.where('name', '==', name)).valueChanges();
  }
  getLocations() {
    return this.db.collection('locations').valueChanges();
  }

  getLocation(id) {
    return this.db.doc('locations/' + id).valueChanges();
  }

  setLocation(location) {
    this.db.doc('locations/' + location.id).set(location);
  }

  getAllBookings() {
    return this.db.collection('bookings').valueChanges();
  }

  getUser(uid) {
    return this.db.doc('users/' + uid).valueChanges();
  }

  getUserBookings(uid) {
    return this.db.collection('bookings', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  createID() {
    return this.db.createId();
  }

  submitApplication(data) {
    const userdata = {
      username: data.appname ? data.appname : 'username',
      email: data.email,
      password: data.password,
      type: 'email'
    };
    return this.auth.emailRegister(userdata).catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        console.log(err.code);
      }
    }).then(() => {
      console.log('user created');
      this.auth.getAuthState().subscribe(user => {
        const bookdata = {
          appname: data.appname,
          email: data.email,
          appstatus: data.appstatus,
          address: data.address,
          phoneno: data.phoneno,
          faxno: data.faxno,
          medium: data.medium,
          type: data.type,
          symbol: data.symbol,
          from: new Date(data.fromDate),
          to: new Date(data.toDate),
          summary: data.summary,
          description: data.description,
          image: data.image,
          trees: data.trees,
          id: data.location,
          ownername: 'PMC',
          noc: data.noc,
          a19: data.a19,
          cost: 20000, // fix cost dynamic
          status: 'pending',
          bookid: data.bookingid ? data.bookingid : this.db.createId(),
          date: new Date(),
          uid: user.uid
        };
        this.db.doc('bookings/' + data.bookingid).set(bookdata);
      });
    });
  }

  pushUpload(file: File, name?: string, bookid?: string) {
    if (file) {
      console.log(file);
      const fileRef = this.storage.ref('application-uploads/' + bookid + '/' + name);
      const task = this.storage.upload('application-uploads/' + bookid + '/' + name, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => this.updateDocURL(url, bookid, name));
        })
      ).subscribe();
    }
  }

  updateDocURL(url, bookid, name) {
    switch (name) {
      case 'd1':
        this.db.doc('bookings/' + bookid).update({
          d1: url
        });
        break;
      case 'd2':
        this.db.doc('bookings/' + bookid).update({
          d2: url
        });
        break;
      case 'd3':
        this.db.doc('bookings/' + bookid).update({
          d3: url
        });
        break;
      case 'd4':
        this.db.doc('bookings/' + bookid).update({
          d4: url
        });
        break;
      case 'd5':
        this.db.doc('bookings/' + bookid).update({
          d5: url
        });
        break;
      case 'd6':
        this.db.doc('bookings/' + bookid).update({
          d6: url
        });
        break;
      case 'd7':
        this.db.doc('bookings/' + bookid).update({
          d7: url
        });
        break;
      case 'd8':
        this.db.doc('bookings/' + bookid).update({
          d8: url
        });
        break;
      case 'd9':
        this.db.doc('bookings/' + bookid).update({
          d9: url
        });
        break;
      case 'd10':
        this.db.doc('bookings/' + bookid).update({
          d10: url
        });
        break;
      case 'd11':
        this.db.doc('bookings/' + bookid).update({
          d11: url
        });
        break;
      case 'd12':
        this.db.doc('bookings/' + bookid).update({
          d12: url
        });
        break;
      case 'd13':
        this.db.doc('bookings/' + bookid).update({
          d13: url
        });
        break;
      case 'd14':
        this.db.doc('bookings/' + bookid).update({
          d14: url
        });
        break;
      case 'd15':
        this.db.doc('bookings/' + bookid).update({
          d15: url
        });
        break;
    }
  }
}
