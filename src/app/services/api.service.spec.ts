import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { ApiService } from './api.service';
import { User } from '../models/user.interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpSpy: Spy<HttpClient>;
  let fakeUsers: User[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.get(ApiService);
    httpSpy = TestBed.get(HttpClient);
    fakeUsers = undefined;
    actualResult = undefined;
  });

  describe('CREATION: successful', () => {
    Then(() => {
      expect(service).toBeTruthy();
      expect(httpSpy).toBeTruthy();
    });
  });

  describe('METHOD: getUsers', () => {
    When(() => {
      service.getUsers(2).subscribe(users => actualResult = users);
    });
    describe('GIVEN a successful request THEN return the users', () => {
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
        httpSpy.get.and.nextOneTimeWith(fakeUsers);
      });
      Then(() => {
        expect(actualResult).toEqual(fakeUsers);
      });
    });
  });
});
