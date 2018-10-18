import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [
    trigger(
      'popIn', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          animate('200ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
        ])
      ]
    )
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  locations;
  monthCost;
  totalCost;
  monthlyCount;
  totalCount;
  currMonth;

  constructor(
    private dataService: DataService
  ) { }

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    this.currMonth = this.months[new Date().getMonth()];
    this.getAllBookings();
    this.getLocations();
  }
  getLocations() {
    this.dataService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }
  getAllBookings() {
    this.dataService.getAllBookings().subscribe(bookings => {
      this.totalCost = 0;
      this.totalCount = 0;
      this.monthCost = 0;
      this.monthlyCount = 0;
      bookings.map(booking => {
        // @ts-ignore
        this.totalCost += booking.cost;
        this.totalCount++;
        // @ts-ignore
        if (booking.date.toDate().getMonth() === new Date().getMonth()) {
          // @ts-ignore
          this.monthCost += booking.cost;
          this.monthlyCount++;
        }
      })
      this.currencyConvert();
    })
  }
  currencyConvert() {
    if (this.totalCost > 999 && this.totalCost < 100000) {
      this.totalCost = (this.totalCost / 1000) + 'K';
    }
    if (this.totalCost > 9999 && this.totalCost < 10000000) {
      this.totalCost = (this.totalCost / 100000) + 'L';
    }

    if (this.monthCost > 999 && this.monthCost < 100000) {
      this.monthCost = (this.monthCost / 1000) + 'K';
    }
    if (this.monthCost > 9999 && this.monthCost < 10000000) {
      this.monthCost = (this.monthCost / 100000) + 'L';
    }
  }

}
