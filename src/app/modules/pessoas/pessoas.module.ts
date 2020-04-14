import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';

import { SharedModule } from '@project/shared/shared.module';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasListComponent } from './pessoas-list/pessoas-list.component';
import { PessoasFormComponent } from './pessoas-form/pessoas-form.component';
import { PessoasViewComponent } from './pessoas-view/pessoas-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PessoasRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    PessoasListComponent,
    PessoasFormComponent,
    PessoasViewComponent
  ],
})
export class PessoasModule { }
