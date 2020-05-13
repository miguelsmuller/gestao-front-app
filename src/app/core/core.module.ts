import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { AuthRoutingModule } from './core-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ExternalLayoutComponent } from './layouts/external-layout/external-layout.component';
import { InternalLayoutComponent } from './layouts/internal-layout/internal-layout.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
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
