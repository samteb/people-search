import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { combineLatest, Observable } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { User } from './models/user.model';
import { ApiService } from './services/api.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  searchText: FormControl;
  filteredUsers$: Observable<User[]>;
  selectedUser: User = null;
  disableBtn = true;
  page = 1;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers(100).subscribe(users => this.storeService.setUsers(users));
    this.searchText = new FormControl('');
    this.searchText.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(searchText => this.storeService.setSearchText(searchText));
    this.filteredUsers$ = combineLatest(this.storeService.users$, this.storeService.searchText$).pipe(
      map(([users, searchText]) => this.searchFilter(users, searchText))
    );
    this.storeService.searchText$.subscribe(searchText => this.disableBtn = searchText.length === 0);
  }

  searchFilter(users: User[], searchText: string) {
    return users.filter(user => user.username.includes(searchText.toLowerCase())
      || user.email.includes(searchText.toLowerCase()));
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  searchUser() {
    this.selectedUser = null;
  }
}
