import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { InternalLayoutComponent } from './layouts/internal-layout/internal-layout.component';
import { ExternalLayoutComponent } from './layouts/external-layout/external-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'recuperar-senha', component: RecoverPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    InternalLayoutComponent,
    ExternalLayoutComponent,
    LoginComponent,
    RecoverPasswordComponent
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthInterceptor
      ]
    };
  }
}
