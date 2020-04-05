import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Pessoa } from '@project/shared/interfaces/pessoa';

@Component({
  selector: 'app-pessoas-view',
  templateUrl: './pessoas-view.component.html',
  styleUrls: ['./pessoas-view.component.scss']
})
export class PessoasViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PessoasViewComponent>,
    @Inject(MAT_DIALOG_DATA) public pessoa: Pessoa
  ) { }

  ngOnInit(): void {
  }

  fecharDialogo() {
    this.dialogRef.close(null);
  }

}
