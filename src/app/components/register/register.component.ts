import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username: 'hshekhar',
    email: 'hemanshoe.shekhar@gmail.com',
    password: 'password',
    type: 'email'
  }

  isTaken;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.user)
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
