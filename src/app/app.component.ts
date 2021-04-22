import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SetInitialUser } from '@app/core/store/actions/auth.action';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new SetInitialUser());
  }
}
