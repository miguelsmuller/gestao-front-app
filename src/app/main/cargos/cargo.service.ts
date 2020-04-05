import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Cargo, DataCargo } from './cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  readonly url = 'http://127.0.0.1:8888/api';

  constructor(
    private http: HttpClient,
  ) { }

  getCargos(keyword: string, sort: string, order: string, page: number): Observable<DataCargo> {
    const requestUrl = `${this.url}/cargos?q=${keyword}&sort=${sort}&order=${order}&page=${page + 1}`;
    console.log(requestUrl);
    return this.http.get<DataCargo>(requestUrl)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }
}
