import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasListComponent } from './pessoas-list/pessoas-list.component';
import { PessoasFormComponent } from './pessoas-form/pessoas-form.component';

const routes: Routes = [
  { path: '', component: PessoasListComponent },
  { path: ':id', component: PessoasFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
