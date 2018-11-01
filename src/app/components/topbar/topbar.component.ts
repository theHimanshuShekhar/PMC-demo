import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  user;

  showuser = false;
  constructor(
    private auth: AuthService
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

}
