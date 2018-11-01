import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user;
  bookings;

  constructor(
    private auth: AuthService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      this.getUser(user.uid);
      this.getUserBookings(user.uid);
    });
  }

  getUser(uid) {
    this.data.getUser(uid).subscribe(data => this.user = data);
  }

  getUserBookings(uid) {
    this.data.getUserBookings(uid).subscribe(bookings => {
      this.bookings = bookings;
      this.filterBookings();
    });
  }

  filterBookings() {
    if (this.bookings) {
      this.bookings.filter(booking => booking.status === 'pending')
    }
  }

}
