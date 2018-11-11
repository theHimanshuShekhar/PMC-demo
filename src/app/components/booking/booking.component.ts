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



  currpage = 5;

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
  };

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
      this.dataService.submitApplication(this.data);
    }
  }
  getCost() {
    console.log(new Date(this.data.toDate));
  }
}
