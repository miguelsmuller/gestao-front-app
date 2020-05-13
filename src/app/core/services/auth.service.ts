import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Usuario } from '@app/shared/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://127.0.0.1:8888/api';

  private subjLogado$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subjUsuario$: BehaviorSubject<Usuario> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
  ) { }

  login(crendetials: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, crendetials)
    .pipe(
      tap(
        (response) => {
          localStorage.setItem('token', response.access_token);
          this.subjLogado$.next(true);
        }
      ),
      catchError((erro) => {

        return throwError(erro);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.subjLogado$.next(false);
    this.subjUsuario$.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
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
  }
}
