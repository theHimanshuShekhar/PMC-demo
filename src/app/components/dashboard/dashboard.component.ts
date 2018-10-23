import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selected;
  ngOnInit() {
    this.changeSelected('orders');
  }

  changeSelected(menuitem) {
    this.selected = menuitem;
  }

}
