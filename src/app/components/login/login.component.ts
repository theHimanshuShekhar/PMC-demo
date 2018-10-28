import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: 'email',
    password: 'password'
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.emailLogin(this.user.email, this.user.password);
  }

}
