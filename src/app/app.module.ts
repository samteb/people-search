import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ApiInterceptorService } from './services/api-interceptor.service';
import { StoreService } from './services/store.service';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { PeopleSearchComponent } from './people-search/people-search.component';
import { PeopleSearchResolve } from './people-search/people-search.resolve';

const ROUTES: Routes = [
  {
    path: '',
    component: PeopleSearchComponent,
    resolve: {
      users: PeopleSearchResolve
    }
  },
  {
    path: ':username',
    component: UserComponent,
    outlet: 'selected'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PeopleSearchComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    NgxPaginationModule
  ],
  providers: [
    PeopleSearchResolve,
    StoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
