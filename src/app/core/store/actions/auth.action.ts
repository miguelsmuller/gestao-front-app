import { Action } from '@ngrx/store';

import { Usuario } from '@app/shared/models/usuario';

export enum AuthActionTypes {
  LOGIN_USER       = '[AUTH] Login User',
  REGISTER_USER    = '[AUTH] Register User',
  SET_INITIAL_USER = '[AUTH] Set Initial User',
  SET_CURRENT_USER = '[AUTH] Set Current User'
}

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LOGIN_USER;
  constructor(public payload: {username: string, password: string}) {}
}

export class RegisterUser implements Action {
  readonly type = AuthActionTypes.REGISTER_USER;
  constructor(public payload: Usuario) {}
}

export class SetInitialUser implements Action {
  readonly type = AuthActionTypes.SET_INITIAL_USER;
}

export class SetCurrentUser implements Action {
  readonly type = AuthActionTypes.SET_CURRENT_USER;
  constructor(public payload: Usuario | null) {}
}

export type AuthActions = LoginUser | RegisterUser | SetInitialUser | SetCurrentUser ;
