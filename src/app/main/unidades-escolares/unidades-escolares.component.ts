import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UnidadeEscolarService } from './unidade-escolar.service';
import { UnidadeEscolar } from './unidade-escolar';

@Component({
  selector: 'app-unidades-escolares',
  templateUrl: './unidades-escolares.component.html',
  styleUrls: ['./unidades-escolares.component.scss']
})
export class UnidadesEscolaresComponent implements OnInit {

  unidadesEscolares$: Observable<UnidadeEscolar[]>;

  constructor(
    private unidadeEscolarService: UnidadeEscolarService
  ) { }

  ngOnInit() {
    this.unidadesEscolares$ = this.unidadeEscolarService.getUnidadesEscolares();
  }
}
