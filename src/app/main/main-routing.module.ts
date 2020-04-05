import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadesEscolaresComponent } from './unidades-escolares/unidades-escolares.component';
import { CargosComponent } from './cargos/cargos.component';

const routes: Routes = [
  {path: '', redirectTo: 'unidades-escolares'},
  {path: 'cargos', component: CargosComponent},
  {path: 'unidades-escolares', component: UnidadesEscolaresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
