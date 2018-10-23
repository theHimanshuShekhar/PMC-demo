import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-popular-chart',
  templateUrl: './popular-chart.component.html',
  styleUrls: ['./popular-chart.component.css']
})
export class PopularChartComponent implements OnInit {
  @Input() locations;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }

          },
        }
      }],
    }
  };
  public barChartLabels: string[];
  public barChartType: string = 'pie';
  public barChartLegend: boolean = false;

  public barChartData: any[] = [
    { data: [], label: 'Bookings' }
  ];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.barChartLabels = [];
    if (this.locations) {
      this.locations.map(location => {
        this.barChartLabels.push(location.name);
        this.dataService.getBookings(location.id).subscribe(bookings => {
          if (bookings) {
            let bookcount = 0;
            bookings.map(booking => {
              bookcount++;
            });
            this.barChartData[0].data.push(bookcount);
          }
        })
      });
    }
  }

}
