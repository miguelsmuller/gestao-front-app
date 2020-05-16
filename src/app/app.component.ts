import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store/store.module';
import { AddError } from '@app/store/actions/errors.action';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new AddError({error: 'message'}));
  }
}
