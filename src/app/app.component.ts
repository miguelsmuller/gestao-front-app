import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Usuario } from './auth/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authenticated$: Observable<boolean>;

  sideBarStatus = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authenticated$ = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
