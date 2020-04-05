import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@project/shared/shared.module';

import { CargosRoutingModule } from './cargos-routing.module';
import { CargosListComponent } from './cargos-list/cargos-list.component';
import { CargosFormComponent } from './cargos-form/cargos-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CargosRoutingModule,
  ],
  declarations: [
    CargosListComponent,
    CargosFormComponent
  ]
})
export class CargosModule { }
