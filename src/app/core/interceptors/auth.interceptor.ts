import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@app/core/services/auth.service';

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
                //this.authService.logout();
                this.router.navigateByUrl('/login');
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
