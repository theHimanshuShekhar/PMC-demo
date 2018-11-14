import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
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
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  bookings;


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getBookings();
  }
  getBookings() {
    this.dataService.getAllBookings().subscribe(bookings => {
      // this.bookings = bookings.map((booking) => {
      //   // @ts-ignore
      //   if (booking.status === 'pending') {
      //     return booking;
      //   }
      // });
      this.bookings = bookings;
    });
  }


  getLocation(id) {
    return 'Location Name';
  }

}
