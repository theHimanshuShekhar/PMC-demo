import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @Input() bookid;
  booking;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    if (this.bookid) {
      this.dataService.getBooking(this.bookid).subscribe(booking => this.booking = booking);
    }
  }

}
