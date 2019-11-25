import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  searchText: FormControl;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.searchText = new FormControl('');
    this.searchText.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(searchText => this.storeService.setSearchText(searchText));
  }
}
