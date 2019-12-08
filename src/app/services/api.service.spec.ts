import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './api-interceptor.service';
import { ApiService } from './api.service';
import { User } from '../models/user.interface';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let injector: TestBed;
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let fakeUsers: User[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true }
      ]
    });
    injector = getTestBed();
    apiService = injector.get(ApiService);
    httpMock = injector.get(HttpTestingController);
    fakeUsers = undefined;
    actualResult = undefined;
  });

  describe('CREATION: successful', () => {
    Then(() => {
      expect(apiService).toBeTruthy();
      expect(httpMock).toBeTruthy();
    });
  });

  describe('METHOD: getUsers', () => {
    When(() => {
      const params = {
        url: `${environment.serverBaseUrl}/users/${fakeUsers.length}`,
        method: 'GET'
      };
      apiService.getUsers(fakeUsers.length).subscribe(users => actualResult = users);
      httpMock.expectOne(params).flush(fakeUsers);
      httpMock.verify();
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
      });
      Then(() => {
        expect(actualResult).toEqual(fakeUsers);
      });
    });
  });
});
