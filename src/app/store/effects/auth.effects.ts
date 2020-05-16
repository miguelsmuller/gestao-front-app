import { SetCurrentUser } from './../actions/auth.action';
import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { AuthService } from '@app/core/services/auth.service';
import { LoginUser, AuthActionTypes } from '@app/store/actions/auth.action';



@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
  ) {}

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<LoginUser>(AuthActionTypes.LOGIN_USER),
    mergeMap(
      (action: LoginUser) => this.authService.login(action.payload).pipe(
        map((user) => new SetCurrentUser(user)),
        catchError(err => of(err))
      )
    )
  );
}
