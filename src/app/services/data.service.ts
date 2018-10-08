import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private db: AngularFirestore
  ) { }

  getLocations() {
    return this.db.collection('locations').valueChanges();
  }

  getLocation(id) {
    return this.db.doc('locations/' + id).valueChanges();
  }

}
