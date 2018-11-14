import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/');
      }
    });
  }

  login() {
    this.authService.emailLogin(this.user.email, this.user.password).then(() => this.router.navigateByUrl('/'));
  }

}
