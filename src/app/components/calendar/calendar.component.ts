import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

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
  @Output() getDatesFromService = new EventEmitter<string>();

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;


  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  check = true;

  fromDate;
  toDate;

  constructor(private dataService: DataService) { }

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


  dayCheck(day) {
    if (new Date() < day) {
      if (this.check) {
        this.fromDate = day;
        this.check = !this.check;
      } else {
        this.toDate = day;
        this.check = !this.check;
      }
      if (this.fromDate > this.toDate) {
        const temp = this.toDate;
        this.toDate = this.fromDate;
        this.fromDate = temp;
      }
      this.dataService.setDate(this.toDate, this.fromDate);
      this.getDatesFromService.emit();
    }
  }

  dateIsValid(date: Date): boolean {
    return date > new Date();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }
