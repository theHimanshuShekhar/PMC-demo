import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private db: AngularFirestore
  ) { }

  getLocationByName(name) {
    return this.db.collection('locations', ref => ref.where('name', '==', name)).valueChanges();
  }
  getLocations() {
    return this.db.collection('locations').valueChanges();
  }

  getLocation(id) {
    return this.db.doc('locations/' + id).valueChanges();
  }

}
