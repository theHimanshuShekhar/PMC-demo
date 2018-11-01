import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private db: AngularFirestore
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
    return this.db.collection('bookings', ref => ref.where("uid", "==", uid)).valueChanges();
  }
}
