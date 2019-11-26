import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { User } from '../models/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  @Input() user: User = {
    avatar: '',
    username: '',
    email: '',
    gender: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.outlet === 'selected') {
      this.route.paramMap.pipe(map(() => window.history.state)).subscribe(state => {
        if (!state.user) {
          return this.router.navigate([ { outlets: { selected: null } } ]);
        }
        this.user = state.user;
      });
    }
  }
}
