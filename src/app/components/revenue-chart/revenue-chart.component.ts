import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.css']
})
export class RevenueChartComponent implements OnInit {
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
    }
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public barChartData: any[] = [
    {
      data: [],
      label: 'Revenue'
    }
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
            let revenue = 0;
            bookings.map(booking => {
              // @ts-ignore
              revenue += booking.cost;
            });
            this.barChartData[0].data.push(revenue);
          }
        })
      });
    }
  }
}
