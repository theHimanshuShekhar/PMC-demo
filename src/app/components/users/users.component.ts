import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getUsers().subscribe(users => this.users = users);
  }

}
