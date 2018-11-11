import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent implements OnInit {

  currpage = 0;

  showAccountDetails = false;
  showCompanyDetails = false;
  showAdvertisementDetails = false;
  showDateDetails = false;
  showLocationDetails = false;
  showAdvert = false;
  showDocs = false;

  location;
  bookings;
  isDisabled;

  fromDate;
  toDate;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
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

<<<<<<< HEAD
  submitForm() {
    console.log('Add booking request to database');
    this.router.navigateByUrl('/account');
=======
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
>>>>>>> 85bfa42ff34ff0a5af9902952d53d2292be8055d
  }
}
