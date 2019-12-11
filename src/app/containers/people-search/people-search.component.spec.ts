import { TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { of } from 'rxjs';
import { PeopleSearchComponent } from './people-search.component';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user.interface';

describe('PeopleSearchComponent', () => {
  let injector: TestBed;
  let peopleSearchComponent: PeopleSearchComponent;
  let router: Router;
  let route: ActivatedRoute;
  let storeServiceSpy: Spy<StoreService>;
  let fakeUsers: User[];

  Given(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        PeopleSearchComponent,
        {
          provide: StoreService,
          useValue: createSpyFromClass(StoreService)
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              users: []
            }),
            queryParams: of({
              username: ''
            })
          }
        }
      ]
    });
    injector = getTestBed();
    peopleSearchComponent = injector.get(PeopleSearchComponent);
    storeServiceSpy = injector.get(StoreService);
    router = injector.get(Router);
    route = injector.get(ActivatedRoute);
    fakeUsers = undefined;
  });

  describe('INIT', () => {
    When(() => {
      peopleSearchComponent.ngOnInit();
    });

    Given(() => {
      fakeUsers = [
        {
          avatar: 'https://randomuser.me/api/portraits/med/women/88.jpg',
          email: 'louane.vidal@example.com',
          gender: 'female',
          username: 'angryostrich988'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/med/men/99.jpg',
          email: 'noel.peixoto@example.com',
          gender: 'male',
          username: 'greenrabbit529'
        }
      ];
      route.data.subscribe(data => data.users = fakeUsers);
    });

    Then(() => {
      storeServiceSpy.setUsers.mustBeCalledWith(fakeUsers);
    });
  });
});
