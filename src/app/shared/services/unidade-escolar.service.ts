import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataUnidadeEscolar, UnidadeEscolar } from '@project/shared/interfaces/unidadeEscolar';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadeEscolarService {
  readonly BASE_URL = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }

  getUnidades(keyword = null, sort = null, order = null, page = null): Observable<DataUnidadeEscolar> {
    let requestUrl = `${this.BASE_URL}/unidades-escolares?`;

    if (keyword) { requestUrl = `${requestUrl}q=${keyword}&`; }
    if (sort) { requestUrl = `${requestUrl}sort=${sort}&`; }
    if (order) { requestUrl = `${requestUrl}order=${order}&`; }
    if (page) { requestUrl = `${requestUrl}page=${page + 1}&`; }

    return this.http.get<DataUnidadeEscolar>(requestUrl)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }

  saveUnidade(unidade: UnidadeEscolar): Observable<UnidadeEscolar> {
    const requestUrl = `${this.BASE_URL}/unidades-escolares`;

    return this.http.post<UnidadeEscolar>(requestUrl, unidade)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }

  updateUnidade(unidade: UnidadeEscolar): Observable<UnidadeEscolar> {
    const requestUrl = `${this.BASE_URL}/unidades-escolares/${unidade.id}`;

    return this.http.patch<UnidadeEscolar>(requestUrl, unidade)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }
}
