import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { User } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.scss']
})

export class PeopleSearchComponent implements OnInit {
  filteredUsers$: Observable<User[]>;
  page = 1;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(pluck('users')).subscribe(users => this.storeService.setUsers(users));
    this.filteredUsers$ = combineLatest(this.storeService.users$, this.storeService.searchText$).pipe(
      map(([users, searchText]) => this.searchFilter(users, searchText))
    );
  }

  searchFilter(users: User[], searchText: string): User[] {
    return users.filter(user => user.username.includes(searchText.toLowerCase())
      || user.email.includes(searchText.toLowerCase()));
  }

  selectUser(user: User) {
    return this.router.navigate([ { outlets: { selected: [ user.username ] } } ], { state: { user } });
  }
}
