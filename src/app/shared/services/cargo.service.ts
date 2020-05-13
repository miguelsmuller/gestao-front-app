import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataCargo, Cargo } from '@app/shared/interfaces/cargo';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  readonly BASE_URL = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }

  getCargos(keyword = null, sort = null, order = null, page = null): Observable<DataCargo> {
    let requestUrl = `${this.BASE_URL}/cargos?`;

    if (keyword) { requestUrl = `${requestUrl}q=${keyword}&`; }
    if (sort) { requestUrl = `${requestUrl}sort=${sort}&`; }
    if (order) { requestUrl = `${requestUrl}order=${order}&`; }
    if (page) { requestUrl = `${requestUrl}page=${page + 1}&`; }

    return this.http.get<DataCargo>(requestUrl)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }

  saveCargo(cargo: Cargo): Observable<Cargo> {
    const requestUrl = `${this.BASE_URL}/cargos`;

    return this.http.post<Cargo>(requestUrl, cargo)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }

  updateCargo(cargo: Cargo): Observable<Cargo> {
    const requestUrl = `${this.BASE_URL}/cargos/${cargo.id}`;

    return this.http.patch<Cargo>(requestUrl, cargo)
    .pipe(
      catchError((erro) => {
        return throwError(erro);
      })
    );
  }
}
