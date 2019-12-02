import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { ApiInterceptorService } from './api-interceptor.service';
import { ApiService } from './api.service';
import { User } from '../models/user.interface';

describe('ApiService', () => {
  let injector: TestBed;
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
    injector = getTestBed();
    service = injector.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // Check if there are no pending requests
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
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

    const req = httpMock.expectOne(`${environment.serverBaseUrl}/users/2`);
    console.log(req);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
