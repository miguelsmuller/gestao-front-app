import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { merge, of, Observable, fromEvent, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  unSubscribeAllObservables$: Subject<any> = new Subject();

  dataSource$: Observable<Pessoa[]>;
  dataSourceColumns: string[] = ['nome_completo', 'data_nascimento', 'cpf'];
  dataSourcePerPage = 0;
  dataSourceTotal = 0;

  constructor(
    private dialog: MatDialog,
    private pessoaService: PessoaService
  ) { }

  ngAfterViewInit() {
    this.tableUpdate();

    const tableSortChange$ = this.tableOrdernador.sortChange
    .pipe( takeUntil(this.unSubscribeAllObservables$) )
    .subscribe(() => this.tablePaginador.pageIndex = 0);

    const tablePaginatorChange$ = fromEvent(document, 'keyup')
    .pipe( takeUntil(this.unSubscribeAllObservables$) )
    .subscribe( (event: KeyboardEvent) => {
      if (event.code === 'ArrowLeft') { this.tablePrevious(); }
      if (event.code === 'ArrowRight') { this.tableNext(); }
    });
  }

  ngOnDestry() {
    this.unSubscribeAllObservables$.next();
  }

  tableUpdate() {
    this.dataSource$ = merge(this.tableOrdernador.sortChange, this.tablePaginador.page)
    .pipe(
      startWith({
        // Start with empty object
      }),
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

        return of([]);
      })
    );
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

  openDialog(pessoa: Pessoa) {
    const formularioConfiguracao = new MatDialogConfig();
    formularioConfiguracao.panelClass = 'mat-dialog';
    formularioConfiguracao.disableClose = false;
    formularioConfiguracao.autoFocus = true;
    formularioConfiguracao.data = pessoa;

    const formularioCriarCargo = this.dialog.open(PessoasViewComponent, formularioConfiguracao);

    formularioCriarCargo.afterClosed().subscribe( (formularioResposta: Pessoa) => {
      this.savePeople(formularioResposta);
    });
  }

  savePeople(pessoa: Pessoa) {
    if (pessoa) {
      console.log(pessoa);
    }
  }
}
