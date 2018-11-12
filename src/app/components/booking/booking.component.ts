import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent implements OnInit {



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
    image: '',
    trees: '',
    location: this.location ? this.location.id : null,
    ownername: 'PMC',
    noc: null,
    a19: null,
    bookingid: null,
  };

  d1;
  d2;
  d3;
  d4;
  d5;
  d6;
  d7;
  d8;
  d9;
  d10;
  d11;
  d12;
  d13;
  d14;
  d15;

  agreed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: NgbModal
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
  }

  navigate(type) {
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
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit() {
    if (this.data && this.location) {
      this.getCost();
      this.data.location = this.location.id;
      this.data.bookingid = this.dataService.createID();
      this.dataService.submitApplication(this.data).then(() => {
        if (this.d1) {
          this.dataService.pushUpload(this.d1.file, 'd1', this.data.bookingid);
        }
        if (this.d2) {
          this.dataService.pushUpload(this.d2.file, 'd2', this.data.bookingid);
        }
        if (this.d3) {
          this.dataService.pushUpload(this.d3.file, 'd3', this.data.bookingid);
        }
        if (this.d4) {
          this.dataService.pushUpload(this.d4.file, 'd4', this.data.bookingid);
        }
        if (this.d5) {
          this.dataService.pushUpload(this.d5.file, 'd5', this.data.bookingid);
        }
        if (this.d6) {
          this.dataService.pushUpload(this.d6.file, 'd6', this.data.bookingid);
        }
        if (this.d7) {
          this.dataService.pushUpload(this.d7.file, 'd7', this.data.bookingid);
        }
        if (this.d8) {
          this.dataService.pushUpload(this.d8.file, 'd8', this.data.bookingid);
        }
        if (this.d9) {
          this.dataService.pushUpload(this.d9.file, 'd9', this.data.bookingid);
        }
        if (this.d10) {
          this.dataService.pushUpload(this.d10.file, 'd10', this.data.bookingid);
        }
        if (this.d11) {
          this.dataService.pushUpload(this.d11.file, 'd11', this.data.bookingid);
        }
        if (this.d12) {
          this.dataService.pushUpload(this.d12.file, 'd12', this.data.bookingid);
        }
        if (this.d13) {
          this.dataService.pushUpload(this.d13.file, 'd13', this.data.bookingid);
        }
        if (this.d14) {
          this.dataService.pushUpload(this.d15.file, 'd14', this.data.bookingid);
        }
        if (this.d15) {
          this.dataService.pushUpload(this.d15.file, 'd15', this.data.bookingid);
        }
      });
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
        this.d1 = doc;
        break;
      case 'd2':
        this.d2 = doc;
        break;
      case 'd3':
        this.d3 = doc;
        break;
      case 'd4':
        this.d4 = doc;
        break;
      case 'd5':
        this.d5 = doc;
        break;
      case 'd6':
        this.d6 = doc;
        break;
      case 'd7':
        this.d7 = doc;
        break;
      case 'd8':
        this.d8 = doc;
        break;
      case 'd9':
        this.d9 = doc;
        break;
      case 'd10':
        this.d10 = doc;
        break;
      case 'd11':
        this.d11 = doc;
        break;
      case 'd12':
        this.d12 = doc;
        break;
      case 'd13':
        this.d13 = doc;
        break;
      case 'd14':
        this.d14 = doc;
        break;
      case 'd15':
        this.d15 = doc;
        break;
    }
  }
}
