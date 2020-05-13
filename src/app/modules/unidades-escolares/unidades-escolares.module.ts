import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { UnidadesEscolaresRoutingModule } from './unidades-escolares-routing.module';
import { UnidadesListComponent } from './unidades-list/unidades-list.component';
import { UnidadesFormComponent } from './unidades-form/unidades-form.component';

@NgModule({
  declarations: [UnidadesListComponent, UnidadesFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    UnidadesEscolaresRoutingModule
  ]
})
export class UnidadesEscolaresModule { }
