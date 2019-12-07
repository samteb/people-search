import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { PeopleSearchComponent } from './people-search.component';
import { StoreService } from '../../services/store.service';

describe('PeopleSearchComponent',() => {
  let peopleSearchComponent: PeopleSearchComponent;
  let storeServiceSpy: Spy<StoreService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleSearchComponent,
        { provide: StoreService, useValue: createSpyFromClass(StoreService) },
      ]
    });
    peopleSearchComponent = TestBed.get(PeopleSearchComponent);
    storeServiceSpy = TestBed.get(StoreService);
  });
});
