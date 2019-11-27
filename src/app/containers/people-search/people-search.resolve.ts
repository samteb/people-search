import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.interface';

@Injectable({ providedIn: 'root' })
export class PeopleSearchResolve implements Resolve<User[]> {
  constructor(private apiService: ApiService) {}

  resolve(): Observable<User[]> {
    return this.apiService.getUsers(100);
  }
}
