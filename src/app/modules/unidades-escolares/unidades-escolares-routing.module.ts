import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadesListComponent } from './unidades-list/unidades-list.component';

const routes: Routes = [
  { path: '', component: UnidadesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesEscolaresRoutingModule { }
