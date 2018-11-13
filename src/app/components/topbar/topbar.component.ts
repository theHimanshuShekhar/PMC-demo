import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  user;

  showuser = false;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.user = user.email;
        this.showuser = true;
      } else {
        this.showuser = false;
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  redirect(type) {
    switch (type) {
      case 'login':
        this.router.navigateByUrl('/login');
        break;
      case 'register':
        this.router.navigateByUrl('/register');
        break;
    }
  }

}
