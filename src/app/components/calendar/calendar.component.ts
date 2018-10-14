import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';

const colors: any = {
  blue: {
    primary: '#ff0088',
    secondary: '#D1E8FF'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @Input() bookings;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  ngOnInit() {
    if (this.bookings) {
      this.bookings.forEach(booking => {
        this.events.push({
          start: booking.from.toDate(),
          end: booking.to.toDate(),
          title: 'Booking ID- ' + booking.bookid,
          color: colors.blue,
          allDay: true,
        });
      });
    }
  }
}
