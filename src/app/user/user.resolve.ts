import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<User> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User {
    if (route.outlet === 'primary') {
      return null;
    }
  }
}
