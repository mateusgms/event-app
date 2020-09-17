import { Component, OnInit } from '@angular/core';
import {User} from './../../models/user';
import {UserService} from './../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  user = {} as User;
  users: User[];

  constructor( private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }
  deleteUser(user: User){
    this.userService.deleteUser(user).subscribe(()=> {
      this.getUsers();
    })
  }
}
