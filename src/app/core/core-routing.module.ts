import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
