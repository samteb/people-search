import { TestBed, getTestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { PeopleSearchComponent } from './people-search.component';
import { StoreService } from '../../services/store.service';

describe('PeopleSearchComponent',() => {
  let injector: TestBed;
  let peopleSearchComponent: PeopleSearchComponent;
  let storeServiceSpy: Spy<StoreService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleSearchComponent,
        { provide: StoreService, useValue: createSpyFromClass(StoreService) },
      ]
    });
    injector = getTestBed();
    peopleSearchComponent = injector.get(PeopleSearchComponent);
    storeServiceSpy = injector.get(StoreService);
  });
});
