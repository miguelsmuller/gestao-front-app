import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Usuario } from '@app/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = environment.api_url;

  constructor(
    private http: HttpClient,
  ) {}

  get token(): string {
    return localStorage.getItem('token');
  }

  set token(val: string) {
    if (val) {
      localStorage.setItem('token', val);
    } else {
      localStorage.removeItem('token');
    }
  }

  login(crendetials: {username: string, password: string}): Observable<string> {
    return this.http.post<any>(`${this.url}/login`, crendetials)
    .pipe(
      mergeMap((response) => {
        this.token = response.access_token;
        return of(response.access_token);
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  whoami(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/info`);
  }

  /* logout() {
    this.token(null);
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.token();
    if (token && !this.subjLogado$.value) {
      return this.checkTokenValidation();
    }
    return this.subjLogado$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<Usuario>(`${this.url}/info`)
    .pipe(
      tap(
        (usuario) => {
          if (usuario) {
            this.subjLogado$.next(true);
            this.subjUsuario$.next(usuario);
          }
        }
      ),
      map(
        (usuario: Usuario) => (usuario) ? true : false
      ),
      catchError((erro) => {
        this.logout();
        return of(false);
      })
    );
  } */
}
