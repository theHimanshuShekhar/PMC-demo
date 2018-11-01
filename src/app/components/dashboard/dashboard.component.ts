import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';

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

  user;

  constructor(
    private auth: AuthService
  ) { }

  selected;
  ngOnInit() {
    this.auth.getAuthState().subscribe(user => this.user = user);
    this.changeSelected('locations');
  }

  changeSelected(menuitem) {
    this.selected = menuitem;
  }

}
