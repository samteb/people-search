import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private usersSource$ = new BehaviorSubject<User[]>([]);
  private searchTextSource$ = new BehaviorSubject<string>('');

  public readonly users$: Observable<User[]> = this.usersSource$.asObservable();
  public readonly searchText$: Observable<string> = this.searchTextSource$.asObservable();

  setUsers(users: User[]): void {
    this.usersSource$.next(users);
  }

  setSearchText(searchText: string): void {
    this.searchTextSource$.next(searchText);
  }
}
