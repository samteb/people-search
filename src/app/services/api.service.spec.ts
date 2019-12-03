import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiInterceptorService } from './api-interceptor.service';
import { ApiService } from './api.service';
import { User } from '../models/user.interface';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptorService,
          multi: true
        }
      ]
    });
    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // Check if there are no pending requests
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should add the serverBaseUrl to each request', () => {
    service.getUsers(100).subscribe(users => {
      expect(users).toBeTruthy();
      expect(users.length).toEqual(100);
    });

    const httpRequest = httpMock.expectOne(`${environment.serverBaseUrl}/users/100`);
    expect(httpRequest.request.url.split('/users/100')[0]).toEqual(environment.serverBaseUrl);
  });

  it('Should GET users', () => {
    const mockUsers: User[] = [
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

    service.getUsers(2).subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const httpRequest = httpMock.expectOne(`${environment.serverBaseUrl}/users/2`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(mockUsers);
  });
});
