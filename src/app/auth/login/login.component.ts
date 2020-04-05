import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;

    const credentials = this.loginForm.value;

    this.authService.login(credentials)
    .subscribe(
      (response) => {
        this.loading = false;

        this.snackBar.open(
          'Usuário autenticado com sucesso. Seja bem vindo.', 'OK',
          {duration: 3000}
        );
        this.router.navigateByUrl('/');
      },
      (erro) => {
        this.loading = false;

        this.snackBar.open(
          'Verifique suas credenciais e tente novamente.', 'OK',
          {duration: 3000}
        );
      }
    );
  }

}
