import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { Pessoa } from '@project/shared/interfaces/pessoa';
import { PessoaService } from '@project/shared/services/pessoa.service';

import { PessoasViewComponent } from './../pessoas-view/pessoas-view.component';

@Component({
  selector: 'app-pessoas-list',
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.scss']
})
export class PessoasListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) tablePaginador: MatPaginator;
  @ViewChild(MatSort) tableOrdernador: MatSort;

  screenInLoading = true;

  dataSource: Pessoa[] = [];
  dataSourceColumns: string[] = ['nome_completo', 'data_nascimento', 'cpf'];
  dataSourcePerPage = 0;
  dataSourceTotal = 0;

  constructor(
    private dialog: MatDialog,
    private pessoaService: PessoaService ) { }

  ngAfterViewInit() {
    this.tableOrdernador.sortChange.subscribe(() => this.tablePaginador.pageIndex = 0);

    this.tableUpdate();
  }

  tableUpdate() {
    merge(this.tableOrdernador.sortChange, this.tablePaginador.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.screenInLoading = true;

        return this.pessoaService.getPessoas(
        '',
        this.tableOrdernador.direction,
        this.tableOrdernador.active,
        this.tablePaginador.pageIndex);

      }),
      map(response => {
        this.screenInLoading = false;
        this.dataSourcePerPage = response.meta.per_page;
        this.dataSourceTotal = response.meta.total;

        return response.data;
      }),
      catchError(() => {
        this.screenInLoading = false;

        return observableOf([]);
      })
    )
    .subscribe(response => this.dataSource = response);
  }

  openDialog(pessoa: Pessoa) {
    const formularioConfiguracao = new MatDialogConfig();
    formularioConfiguracao.panelClass = 'mat-dialog';
    formularioConfiguracao.disableClose = false;
    formularioConfiguracao.autoFocus = true;
    formularioConfiguracao.data = pessoa;

    const formularioCriarCargo = this.dialog.open(PessoasViewComponent, formularioConfiguracao);

    formularioCriarCargo.afterClosed().subscribe( (formularioResposta: Pessoa) => {
      this.saveCargo(formularioResposta);
    });
  }

  saveCargo(cargo: Pessoa) {
    if (cargo) {
      console.log(cargo);
    }
  }

  tableNext() {
    if (this.tablePaginador.hasNextPage()) {
      this.tablePaginador.nextPage();
    }
  }

  tablePrevious() {
    if (this.tablePaginador.hasPreviousPage()) {
      this.tablePaginador.previousPage();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft') { this.tablePrevious(); }
    if (event.code === 'ArrowRight') { this.tableNext(); }
  }

}
