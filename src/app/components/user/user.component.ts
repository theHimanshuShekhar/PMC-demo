import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user;
  bookings;
  currentbooking;

  constructor(
    private auth: AuthService,
    private data: DataService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.getUser(user.uid);
        this.getUserBookings(user.uid);
      }
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
      this.bookings.filter(booking => booking.status === 'pending');
    }
  }

  cancel(bookid) {
    this.data.cancel(bookid);
  }

  close() {
    this.modalService.dismissAll();
  }

  open(content, booking) {
    this.currentbooking = booking;
    this.modalService.open(content, { size: 'lg' });
  }

}
