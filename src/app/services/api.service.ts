import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })

export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers(size: number): Observable<User[]> {
    return this.http.get<User[]>(`users/${size}`).pipe(
      catchError(error => throwError(error))
    );
  }
}
