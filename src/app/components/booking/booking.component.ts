import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})


export class BookingComponent implements OnInit {

  appname;



  currpage = 0;

  location;
  bookings;
  isDisabled;

  data = {
    appname: '',
    email: '',
    password: '',
    appstatus: '',
    address: '',
    phoneno: '',
    faxno: '',
    medium: '',
    type: '',
    symbol: '',
    fromDate: null,
    toDate: null,
    summary: '',
    description: '',
    image: null,
    trees: '',
    location: this.location ? this.location.id : null,
    ownername: 'PMC',
    noc: null,
    a19: null,
    bookingid: null,
    d1: null,
    d2: null,
    d3: null,
    d4: null,
    d5: null,
    d6: null,
    d7: null,
    d8: null,
    d9: null,
    d10: null,
    d11: null,
    d12: null,
    d13: null,
    d14: null,
    d15: null,
  };

  isLoggedIn = false;
  isValid = false;

  agreed = false;
  showLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: NgbModal,
    private auth: AuthService
  ) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.dataService.getLocation(params.id).subscribe(location => this.location = location);
        this.dataService.getBookings(params.id).subscribe(bookings => {
          this.bookings = bookings;
        });
      } else {
        this.router.navigate(['/']);
      }
    });
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.currpage = 1;
        this.data.email = user.email;
        // @ts-ignore
        this.dataService.getUser(user.uid).subscribe(userdata => this.data.appname = userdata.userName);
      }
    });
  }

  navigate(type) {
    if (!this.isLoggedIn) {
      switch (type) {
        case 'next':
          if (this.currpage < 5) {
            this.currpage++;
          }
          break;
        case 'prev':
          if (this.currpage > 0) {
            this.currpage--;
          }
          break;
      }
    } else {
      switch (type) {
        case 'next':
          if (this.currpage < 4) {
            this.currpage++;
          }
          if (this.currpage === 4 && this.agreed) {
            this.currpage++;
          }
          break;
        case 'prev':
          if (this.currpage > 1) {
            this.currpage--;
          }
          break;
      }
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit() {
    if (this.data && this.location) {
      if (this.data.appname && this.data.email && this.data.address
        && this.data.appstatus && this.data.address && this.data.medium
        && this.data.type && this.data.toDate && this.data.fromDate && this.data.image && this.data.description) {
        this.getCost();
        this.data.location = this.location.id;
        this.data.bookingid = this.dataService.createID();
        this.dataService.submitApplication(this.data);
        this.showLoading = true;
        this.modalService.dismissAll();
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    }
  }
  getCost() {
    // console.log(new Date(this.data.toDate));
  }

  processDoc(event, filename) {
    const doc = {
      file: event.target.files[0],
      filename: filename,
    };
    switch (filename) {
      case 'd1':
        this.data.d1 = doc;
        break;
      case 'd2':
        this.data.d2 = doc;
        break;
      case 'd3':
        this.data.d3 = doc;
        break;
      case 'd4':
        this.data.d4 = doc;
        break;
      case 'd5':
        this.data.d5 = doc;
        break;
      case 'd6':
        this.data.d6 = doc;
        break;
      case 'd7':
        this.data.d7 = doc;
        break;
      case 'd8':
        this.data.d8 = doc;
        break;
      case 'd9':
        this.data.d9 = doc;
        break;
      case 'd10':
        this.data.d10 = doc;
        break;
      case 'd11':
        this.data.d11 = doc;
        break;
      case 'd12':
        this.data.d12 = doc;
        break;
      case 'd13':
        this.data.d13 = doc;
        break;
      case 'd14':
        this.data.d14 = doc;
        break;
      case 'd15':
        this.data.d15 = doc;
        break;
      case 'image':
        this.data.image = doc;
    }
  }
}
