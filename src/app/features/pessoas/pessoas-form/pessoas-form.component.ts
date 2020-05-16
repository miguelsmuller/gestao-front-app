import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Pessoa } from '@app/shared/models/pessoa';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.scss']
})
export class PessoasFormComponent implements OnInit {
  internalPessoa: Pessoa;
  idFromRoute = '';

  pessoaForm = this.fb.group({
    id: ['', []],
    nome_completo: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)]
    ],
    data_nascimento: ['', [
        Validators.required]
    ],
    cpf: ['', []],
    sexo: ['masculino', [
      Validators.required]],
    telefone: ['', []],
    email: ['', []],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.idFromRoute = this.route.snapshot.paramMap.get('id');
    this.pessoaForm.controls.id.setValue(this.route.snapshot.paramMap.get('id'));
  }
}
