import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-location',
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
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @Input() location;
  @Output() toggleInfo = new EventEmitter<string>();
  fullview = false;
  bookings;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.location) {
      this.fullview = true;
      this.route.params.subscribe(params => {
        this.dataService.getLocation(params.id).subscribe(location => {
          this.location = location;
          this.getBookings();
        });
      });
    }
  }

  getDate(timestamp) {
    return timestamp.toDate();
  }

  getBookings() {
    this.dataService.getBookings(this.location.id).subscribe(bookings => this.bookings = bookings);
  }

  clickBooking() {
    window.scroll(0, 0);
    this.router.navigate(['location', this.location.id]);
  }

  toggleShowInfo() {
    this.toggleInfo.emit();
  }

  sendToBooking() {
    this.router.navigate(['/book'], {
      queryParams: {
        id: this.location.id
      }
    });
  }

}
