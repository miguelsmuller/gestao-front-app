import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { errorReducer, ErrorState } from '@app/core/store/reducers/erros.reducer';
import { authReducer, AuthState } from '@app/core/store/reducers/auth.reducer';
import { AuthEffects } from '@app/core/store/effects/auth.effects';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export interface AppState {
  error: ErrorState;
  auth: AuthState;
}

export const coreReducers: ActionReducerMap<AppState> = {
  error: errorReducer,
  auth: authReducer
};

export const coreEffects = [
  AuthEffects
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.forRoot(coreEffects),
    StoreModule.forRoot(coreReducers),
    CoreModule.forRoot(),
    SharedModule,
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
