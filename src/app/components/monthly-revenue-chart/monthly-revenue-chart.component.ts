import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-monthly-revenue-chart',
  templateUrl: './monthly-revenue-chart.component.html',
  styleUrls: ['./monthly-revenue-chart.component.css']
})
export class MonthlyRevenueChartComponent implements OnInit {
  // lineChart
  display = false;
  public lineChartData: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Revenue' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartOptions: any = {
    maintainAspectRatio: false,
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
            if (Math.floor(label) === label) {
              return label;
            }

          },
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0,255,0,0.4)',
      pointBackgroundColor: 'rgba(0,255,0,0.6)',
      borderColor: 'rgba(148,159,177,1)',
      pointBorderColor: 'rgba(0,255,0,1)',
      pointHoverBackgroundColor: 'rgba(0,255,0,1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getAllBookings().subscribe(bookings => {
      bookings.map(booking => {
        // @ts-ignore
        this.lineChartData[0].data[booking.date.toDate().getMonth()] += booking.cost;
      });
      this.display = true;
    });
  }

}
