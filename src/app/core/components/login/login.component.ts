import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/core/services/auth.service';
import { Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private pageTitle: Title,
  ) {
    this.pageTitle.setTitle(environment.app_name + ' - Login');
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;

      this.authService.login( this.loginForm.value )
      .subscribe(
        (success) => {
          this.loading = false;
          this.snackBar.open( 'Usuário autenticado com sucesso. Seja bem vindo.', 'OK',
            {duration: 3000}
          );
          this.router.navigateByUrl('/');
        },
        (erro) => {
          this.loading = false;
          this.snackBar.open( 'Verifique suas credenciais e tente novamente.', 'OK',
            {duration: 3000}
          );
        }
      );
    } else {
      this.snackBar.open( 'Preencha o formulário de login corretamente e tente novamente.', 'OK',
        {duration: 3000}
      );
    }
  }
}
