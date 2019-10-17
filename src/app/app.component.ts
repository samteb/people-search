import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { User } from './models/user.model';
import { Subject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  users$ = new Subject<User[]>();
  usersSource: User[];
  usersList: User[];
  selectedUser: User = null;
  searchText = '';
  page = 1;

  constructor(
    private apiService: ApiService,
  ) {
    this.apiService.getUsers(100).subscribe(users => {
      this.usersSource = users;
      this.usersList = users;
    });
    this.users$.subscribe(users => this.usersList = users);
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  onKeydown() {
    this.users$.next(this.usersSource.filter(user => user.username.includes(this.searchText.toLowerCase()) || user.email.includes(this.searchText.toLowerCase())));
  }

  searchUser(searchTerm: string) {
    this.selectedUser = null;
    this.users$.next(this.usersSource.filter(user => user.username === searchTerm.toLowerCase() || user.email === searchTerm.toLowerCase()));
  }
}
