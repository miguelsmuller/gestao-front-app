import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PessoasComponent } from './pessoas/pessoas.component';
import { CargosComponent } from './cargos/cargos.component';
import { UnidadesEscolaresComponent } from './unidades-escolares/unidades-escolares.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [PessoasComponent, CargosComponent, UnidadesEscolaresComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
  ]
})
export class MainModule { }
