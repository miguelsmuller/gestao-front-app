import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnidadeEscolar } from '@app/shared/models/unidadeEscolar';
import { UnidadeEscolarService } from '@app/shared/services/unidade-escolar.service';

@Component({
  selector: 'app-unidades-form',
  templateUrl: './unidades-form.component.html',
  styleUrls: ['./unidades-form.component.scss']
})
export class UnidadesFormComponent implements OnInit {
  internalCargo: UnidadeEscolar;
  formInSaving = false;

  unidadeForm = this.fb.group({
    id: [null],
    nome: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60)]],
    inativo: [false]
  });

  constructor(
    private unidadeService: UnidadeEscolarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UnidadesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public unidadeFromParent: UnidadeEscolar) { }

  ngOnInit() {
    if (this.unidadeFromParent) {
      this.unidadeForm.patchValue(this.unidadeFromParent);
    } else {
      this.unidadeForm.reset();
      this.unidadeForm.setValue({
        id: null,
        nome: '',
        inativo: false
      });
    }
    this.internalCargo = this.unidadeForm.value;
  }

  fecharDialogo() {
    this.dialogRef.close();
  }

  salvarDialogo() {
    this.formInSaving = true;
    if (this.unidadeForm.get('id').value === null) {
      this.unidadeService.saveUnidade(this.unidadeForm.value)
      .subscribe(
        (response: UnidadeEscolar) => {
          this.snackBar.open(
            'Cargo inserido com sucesso...', 'OK',
            {duration: 3000}
          );
          this.formInSaving = false;

          return this.dialogRef.close(true);
        }
      );
    } else {
      this.unidadeService.updateUnidade(this.unidadeForm.value)
      .subscribe(
        (response) => {
          this.snackBar.open(
            'Cargo atualizado com sucesso...', 'OK',
            {duration: 3000}
          );
          this.formInSaving = false;

          return this.dialogRef.close(true);
        }
      );
    }
  }
}
