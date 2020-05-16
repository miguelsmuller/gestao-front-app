import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Usuario } from '@app/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = environment.api_url;

  private subjLogado$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subjUsuario$: BehaviorSubject<Usuario> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
  ) {}

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(val: string) {
    if (val) {
      localStorage.setItem('token', val);
    } else {
      localStorage.removeItem('token');
    }
  }

  login(crendetials: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, crendetials)
    .pipe(
      tap(
        (response) => {
          this.setToken(response.access_token);
          this.subjLogado$.next(true);
        }
      ),
      catchError((erro) => {

        return throwError(erro);
      })
    );
  }

  logout() {
    this.setToken(null);
    this.subjLogado$.next(false);
    this.subjUsuario$.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
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
