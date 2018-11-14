import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  toDate;
  fromDate;

  setDate(to, from) {
    this.toDate = to;
    this.fromDate = from;
  }

  update(bookid, data) {
    return this.db.doc('bookings/' + bookid).update(data);
  }

  cancel(bookid) {
    return this.db.doc('bookings/' + bookid).delete();
  }

  getDate() {
    return { to: this.toDate, from: this.fromDate };
  }

  getBooking(id) {
    return this.db.doc('bookings/' + id).valueChanges();
  }

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
    return this.db.collection('bookings', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getUser(uid) {
    return this.db.doc('users/' + uid).valueChanges();
  }

  getUserByEmail(email) {
    return this.db.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  getUserBookings(uid) {
    return this.db.collection('bookings', ref => ref.where('uid', '==', uid).orderBy('date', 'desc')).valueChanges();
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
    this.auth.getAuthState().subscribe(loggeduser => {
      if (loggeduser) {
        console.log('User logged in');
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
          image: '',
          trees: data.trees,
          id: data.location,
          ownername: 'PMC',
          noc: data.noc,
          a19: data.a19,
          cost: 18000 * Math.floor(Math.random() * 10) + 1,
          status: 'pending',
          bookid: data.bookingid ? data.bookingid : this.db.createId(),
          date: new Date(),
          uid: loggeduser.uid
        };
        return this.db.doc('bookings/' + data.bookingid).set(bookdata)
          .then(() => {
            console.log('Uploads called');
            if (data.image) {
              this.pushUpload(data.image.file, 'image', data.bookingid);
            }
            if (data.d1) {
              this.pushUpload(data.d1.file, 'd1', data.bookingid);
            }
            if (data.d2) {
              this.pushUpload(data.d2.file, 'd2', data.bookingid);
            }
            if (data.d3) {
              this.pushUpload(data.d3.file, 'd3', data.bookingid);
            }
            if (data.d4) {
              this.pushUpload(data.d4.file, 'd4', data.bookingid);
            }
            if (data.d5) {
              this.pushUpload(data.d5.file, 'd5', data.bookingid);
            }
            if (data.d6) {
              this.pushUpload(data.d6.file, 'd6', data.bookingid);
            }
            if (data.d7) {
              this.pushUpload(data.d7.file, 'd7', data.bookingid);
            }
            if (data.d8) {
              this.pushUpload(data.d8.file, 'd8', data.bookingid);
            }
            if (data.d9) {
              this.pushUpload(data.d9.file, 'd9', data.bookingid);
            }
            if (data.d10) {
              this.pushUpload(data.d10.file, 'd10', data.bookingid);
            }
            if (data.d11) {
              this.pushUpload(data.d11.file, 'd11', data.bookingid);
            }
            if (data.d12) {
              this.pushUpload(data.d12.file, 'd12', data.bookingid);
            }
            if (data.d13) {
              this.pushUpload(data.d13.file, 'd13', data.bookingid);
            }
            if (data.d14) {
              this.pushUpload(data.d15.file, 'd14', data.bookingid);
            }
            if (data.d15) {
              this.pushUpload(data.d15.file, 'd15', data.bookingid);
            }
          }).then(() => this.router.navigateByUrl('/account'));
      } else {
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
              image: '',
              trees: data.trees,
              id: data.location,
              ownername: 'PMC',
              noc: data.noc,
              a19: data.a19,
              cost: 18000 * Math.floor(Math.random() * 10) + 1,
              status: 'pending',
              bookid: data.bookingid ? data.bookingid : this.db.createId(),
              date: new Date(),
              uid: loggeduser.uid
            };
            this.db.doc('bookings/' + data.bookingid).set(bookdata)
              .then(() => {
                console.log('Uploads called');
                if (data.image) {
                  this.pushUpload(data.image.file, 'image', data.bookingid);
                }
                if (data.d1) {
                  this.pushUpload(data.d1.file, 'd1', data.bookingid);
                }
                if (data.d2) {
                  this.pushUpload(data.d2.file, 'd2', data.bookingid);
                }
                if (data.d3) {
                  this.pushUpload(data.d3.file, 'd3', data.bookingid);
                }
                if (data.d4) {
                  this.pushUpload(data.d4.file, 'd4', data.bookingid);
                }
                if (data.d5) {
                  this.pushUpload(data.d5.file, 'd5', data.bookingid);
                }
                if (data.d6) {
                  this.pushUpload(data.d6.file, 'd6', data.bookingid);
                }
                if (data.d7) {
                  this.pushUpload(data.d7.file, 'd7', data.bookingid);
                }
                if (data.d8) {
                  this.pushUpload(data.d8.file, 'd8', data.bookingid);
                }
                if (data.d9) {
                  this.pushUpload(data.d9.file, 'd9', data.bookingid);
                }
                if (data.d10) {
                  this.pushUpload(data.d10.file, 'd10', data.bookingid);
                }
                if (data.d11) {
                  this.pushUpload(data.d11.file, 'd11', data.bookingid);
                }
                if (data.d12) {
                  this.pushUpload(data.d12.file, 'd12', data.bookingid);
                }
                if (data.d13) {
                  this.pushUpload(data.d13.file, 'd13', data.bookingid);
                }
                if (data.d14) {
                  this.pushUpload(data.d15.file, 'd14', data.bookingid);
                }
                if (data.d15) {
                  this.pushUpload(data.d15.file, 'd15', data.bookingid);
                }
              }).then(() => this.router.navigateByUrl('/account'));
          });
        });
      }
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
      case 'image':
        this.db.doc('bookings/' + bookid).update({
          image: url
        });
        break;
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
