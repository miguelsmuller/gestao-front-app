import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('token')) {
      const token = 'Bearer ' + localStorage.getItem('token');

      const newReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      });

      return next.handle(newReq)
      .pipe(
        catchError(
          (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                this.authService.logout();
                this.router.navigateByUrl('/auth/login');
              }
            }
            return throwError(error);
          }
        )
      );
    }
    return next.handle(req);
  }
}
