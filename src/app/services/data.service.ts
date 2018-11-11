import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
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

  submitApplication(data) {
    const userdata = {
      username: data.appname ? data.appname : 'username',
      email: data.email,
      password: data.password,
      type: 'email'
    };
    this.auth.emailRegister(userdata).then(() => {
      console.log('user created');
      this.auth.getAuthState().subscribe(user => {
        const bookingid = this.db.createId();
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
          bookid: bookingid,
          date: new Date(),
          uid: user.uid
        };
        this.db.doc('bookings/' + bookingid).set(bookdata);
      });
    });
  }
}
