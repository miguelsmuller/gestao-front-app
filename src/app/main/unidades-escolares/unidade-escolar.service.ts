import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UnidadeEscolar } from './unidade-escolar';

@Injectable({
  providedIn: 'root'
})
export class UnidadeEscolarService {

  readonly url = 'http://127.0.0.1:8888/api';

  constructor(
    private http: HttpClient,
  ) { }

  getUnidadesEscolares(): Observable<UnidadeEscolar[]> {
    return this.http.get<UnidadeEscolar[]>(`${this.url}/unidades-escolares`)
    .pipe(
      tap(
        (pessoa) => { console.log(pessoa); }
      ),
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }
}
