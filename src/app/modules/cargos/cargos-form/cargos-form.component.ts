import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CargoService } from '@project/shared/services/cargo.service';
import { Cargo } from '@project/shared/interfaces/cargo';

@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.scss']
})
export class CargosFormComponent implements OnInit {
  internalCargo: Cargo;
  formInSaving = false;

  cargoForm = this.fb.group({
    id: [null],
    nome: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60)]],
    inativo: [false]
  });

  constructor(
    private cargoService: CargoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CargosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public cargoFromParent: Cargo) { }

  ngOnInit() {
    if (this.cargoFromParent) {
      this.cargoForm.patchValue(this.cargoFromParent);
    } else {
      this.cargoForm.reset();
      this.cargoForm.setValue({
        id: null,
        nome: '',
        inativo: false
      });
    }
    this.internalCargo = this.cargoForm.value;
  }

  fecharDialogo() {
    this.dialogRef.close();
  }

  salvarDialogo() {
    this.formInSaving = true;
    if (this.cargoForm.get('id').value === null) {
      this.cargoService.saveCargo(this.cargoForm.value)
      .subscribe(
        (response: Cargo) => {
          this.snackBar.open(
            'Cargo inserido com sucesso...', 'OK',
            {duration: 3000}
          );
          this.formInSaving = false;

          return this.dialogRef.close(true);
        }
      );
    } else {
      this.cargoService.updateCargo(this.cargoForm.value)
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
