import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { errorReducer, ErrorState } from '@app/store/reducers/erros.reducer';
import { authReducer, AuthState } from '@app/store/reducers/auth.reducer';
import { AuthEffects } from '@app/store/effects/auth.effects';

export interface AppState {
  error: ErrorState;
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  error: errorReducer,
  auth: authReducer
};

export const appEffects = [
  AuthEffects
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot(appEffects),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument(),
  ]
})
export class AppStoreModule { }
