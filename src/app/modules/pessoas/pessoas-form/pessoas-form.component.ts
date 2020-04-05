import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Pessoa } from '@project/shared/interfaces/pessoa';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.scss']
})
export class PessoasFormComponent implements OnInit {
  internalPessoa: Pessoa;

  pessoaForm = this.fb.group({
    id: [{value: null}],
    nome_completo: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)]],
    data_nascimento: ['', [
        Validators.required]],
    cpf: [''],
    sexo: ['masculino', [
      Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const  id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }
}
