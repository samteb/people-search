import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from './models/user.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  searchText: FormControl;
  searchText$: Observable<string>;
  users$: Observable<User[]>;
  filteredUsers$: Observable<User[]>;
  selectedUser: User = null;
  page = 1;
  disableBtn = true;

  constructor(
    private apiService: ApiService,
  ) {
    this.searchText = new FormControl('');
    this.searchText$ = this.searchText.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()
    );
    this.users$ = this.apiService.getUsers(100);
    this.filteredUsers$ = combineLatest(this.users$, this.searchText$).pipe(
      map(([users, searchText]) => users.filter(user => user.username.includes(searchText.toLowerCase()) || user.email.includes(searchText.toLowerCase())))
    );
    this.searchText$.subscribe(value => this.disableBtn = value.length === 0);
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  searchUser() {
    this.selectedUser = null;
  }
}
