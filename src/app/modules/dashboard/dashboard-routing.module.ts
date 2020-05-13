import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core/guards/auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent, canActivate: [AuthGuardService] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
