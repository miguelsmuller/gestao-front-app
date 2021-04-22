import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import { Usuario } from '@app/shared/models/usuario';
import { AuthService } from '@app/core/services/auth.service';
import * as fromAuth from '@app/core/store/actions/auth.action';
import * as fromError from '@app/core/store/actions/errors.action';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private authService: AuthService,
  ) {}

  @Effect() setInitialUser$: Observable<Action> = this.action$.pipe(
    ofType<fromAuth.SetInitialUser>(fromAuth.AuthActionTypes.SET_INITIAL_USER),
    mergeMap((action: fromAuth.SetInitialUser) =>
      this.authService.whoami().pipe(
        map((usuario: Usuario) => new fromAuth.SetCurrentUser(usuario)),
        catchError(err => {
          console.log(err);
          this.store.dispatch(new fromAuth.SetCurrentUser(null));
          this.authService.token = null;
          return of(new fromError.AddError(err.error));
        })
      )
    )
  );

  /* @Effect() loginUser$: Observable<Action> = this.action$.pipe(
    ofType<fromAuth.LoginUser>(fromAuth.AuthActionTypes.LOGIN_USER),
    mergeMap((action: fromAuth.LoginUser) =>
      this.authService.login(action.payload).pipe(
        map((user: Usuario) => new fromAuth.SetCurrentUser(user)),
        catchError(err => {
          this.store.dispatch(new fromAuth.SetCurrentUser(null));
          this.authService.token = null;
          return of(new fromError.AddError(err.error));
        })
      )
    )
  ); */

  /* @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<LoginUser>(AuthActionTypes.LOGIN_USER),
    mergeMap(
      (action: LoginUser) => this.authService.login(action.payload).pipe(
        map((user) => new SetCurrentUser(user)),
        catchError(err => of(err))
      )
    )
  ); */
}
