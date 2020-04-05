import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './core/guards/auth-guard.service';

import { InternalLayoutComponent } from './core/layouts/internal-layout/internal-layout.component';
import { ExternalLayoutComponent } from './core/layouts/external-layout/external-layout.component';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/dashboard'
  },
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: '',
    component: InternalLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      }, {
        path: 'cargos',
        loadChildren: () => import('./modules/cargos/cargos.module').then(m => m.CargosModule),
        canActivate: [AuthGuardService]
      }, {
        path: 'pessoas',
        loadChildren: () => import('./modules/pessoas/pessoas.module').then(m => m.PessoasModule),
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '**', redirectTo: '/dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
