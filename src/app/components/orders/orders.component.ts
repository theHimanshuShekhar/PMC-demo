import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
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
      this.bookings = bookings;
    });
  }

  getLocation(id) {
    return 'Location Name';
  }

}
