import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  isAdmin = false;
  isSuperAdmin = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  selected;
  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.user = user;
        this.auth.checkAdmin(user.uid).subscribe(admin => {
          if (admin && admin[0]) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        });
        this.auth.checkSuperAdmin(user.uid).subscribe(superadmin => {
          if (superadmin && superadmin[0]) {
            this.isSuperAdmin = true;
          } else {
            this.isSuperAdmin = false;
          }
        });
      } else {
        this.redirect();
      }
    });
    this.changeSelected('locations');
  }

  redirect() {
    this.router.navigateByUrl('/');
  }

  changeSelected(menuitem) {
    this.selected = menuitem;
  }

}
