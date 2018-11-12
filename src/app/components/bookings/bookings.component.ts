import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  locations;
  bookings;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getAllBookings().subscribe(bookings => {
      this.bookings = bookings;
      this.dataService.getLocations().subscribe(locations => this.locations = locations);
    });
  }
  getLocationName(id) {
    const name = this.locations.filter(location => location.id === id);
    return name[0].name;
  }

}
