import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private usersSource$ = new BehaviorSubject<User[]>([]);
  private searchTextSource$ = new BehaviorSubject<string>('');
  public readonly users$ = this.usersSource$.asObservable();
  public readonly searchText$ = this.searchTextSource$.asObservable();

  setUsers(users: User[]) {
    this.usersSource$.next(users);
  }

  setSearchText(searchText: string) {
    this.searchTextSource$.next(searchText);
  }
}
