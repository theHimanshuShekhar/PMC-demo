import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username: '',
    email: '',
    password: '',
    type: 'email'
  };

  isTaken;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/');
      }
    });
  }

  register() {
    this.authService.emailRegister(this.user).then(() => this.router.navigateByUrl('/'));
  }

  async checkUsername() {
    await this.afs.collection('users', ref => ref.where('userName', '==', this.user.username)).valueChanges().subscribe(user => {
      if (user[0]) {
        this.isTaken = true;
      } else {
        this.isTaken = false;
      }
    });
  }

}
