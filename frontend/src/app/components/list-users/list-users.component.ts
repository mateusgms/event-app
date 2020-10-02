import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  user = {} as User;
  users: User[];
  displayedColumns: string[] = ['name', 'email'];
  showSpinner = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      () => {}, // errors
      () => {
        this.showSpinner = false;
      }
    );
  }
  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(
      () => {
        this.getUsers();
      },
      () => {}, // errors
      () => {
        window.location.reload();
      }
    );
  }
}
