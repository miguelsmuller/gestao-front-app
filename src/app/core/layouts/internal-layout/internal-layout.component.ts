import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@project/core/services/auth.service';

@Component({
  selector: 'app-internal-layout',
  templateUrl: './internal-layout.component.html',
})
export class InternalLayoutComponent implements OnInit {
  authenticated$: Observable<boolean>;
  sideBarStatus = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authenticated$ = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
