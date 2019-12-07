import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map, pluck, concatMap } from 'rxjs/operators';

import { User } from '../../models/user.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.scss']
})

export class PeopleSearchComponent implements OnInit {
  filteredUsers$: Observable<User[]>;
  selectedUser: User;
  page = 1;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(pluck('users')).subscribe(users => this.storeService.setUsers(users));
    this.route.queryParams.pipe(
      pluck('username'),
      concatMap(username => this.storeService.users$.pipe(
        map(users => users.find(user => user.username === username))
      ))
    ).subscribe(user => this.selectedUser = user);
    this.filteredUsers$ = combineLatest(this.storeService.users$, this.storeService.searchText$).pipe(
      map(([users, searchText]) => this.searchFilter(users, searchText))
    );
  }

  searchFilter(users: User[], searchText: string): User[] {
    return users.filter(user => user.username.includes(searchText.toLowerCase())
      || user.email.includes(searchText.toLowerCase()));
  }

  selectUser(user: User): Promise<boolean> {
    this.selectedUser = user;
    return this.router.navigate([], { queryParams: { username: user.username } });
  }
}
