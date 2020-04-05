import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataPessoa, Pessoa } from '@project/shared/interfaces/pessoa';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  readonly BASE_URL = environment.api_url;

  constructor(
    private http: HttpClient ) { }

  getPessoas(keyword = null, sort = null, order = null, page = null): Observable<DataPessoa> {
    let requestUrl = `${this.BASE_URL}/pessoas?`;

    if (keyword) { requestUrl = `${requestUrl}q=${keyword}&`; }
    if (sort) { requestUrl = `${requestUrl}sort=${sort}&`; }
    if (order) { requestUrl = `${requestUrl}order=${order}&`; }
    if (page) { requestUrl = `${requestUrl}page=${page + 1}&`; }

    return this.http.get<DataPessoa>(requestUrl)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }

  savePessoa(pessoa: Pessoa): Observable<Pessoa> {
    const requestUrl = `${this.BASE_URL}/pessoas`;

    return this.http.post<Pessoa>(requestUrl, pessoa)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }

  updatePessoa(pessoa: Pessoa): Observable<Pessoa> {
    const requestUrl = `${this.BASE_URL}/cargos/${pessoa.id}`;

    return this.http.patch<Pessoa>(requestUrl, pessoa)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }
}
