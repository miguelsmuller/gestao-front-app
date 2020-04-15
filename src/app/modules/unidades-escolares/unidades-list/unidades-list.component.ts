import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { merge, of, Observable, fromEvent, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataUnidadeEscolar, UnidadeEscolar } from '@project/shared/interfaces/unidadeEscolar';
import { UnidadeEscolarService } from '@project/shared/services/unidade-escolar.service';
import { UnidadesFormComponent } from './../unidades-form/unidades-form.component';

@Component({
  selector: 'app-unidades-list',
  templateUrl: './unidades-list.component.html',
  styleUrls: ['./unidades-list.component.scss']
})
export class UnidadesListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) tablePaginador: MatPaginator;
  @ViewChild(MatSort) tableOrdernador: MatSort;
  @ViewChild('tableSearchKeyword') tableSearchKeyword: ElementRef;

  screenInLoading = true;

  unSubscribeAllObservables$: Subject<any> = new Subject();

  dataSource$: Observable<UnidadeEscolar[]>;
  dataSourceColumns: string[] = ['nome_completo', 'inep', 'localizacao', 'inativo'];
  dataSourcePerPage = 0;
  dataSourceTotal = 0;

  constructor(
    private dialog: MatDialog,
    private unidadeService: UnidadeEscolarService
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

        return this.unidadeService.getUnidades(
          this.tableSearchKeyword.nativeElement.value,
          this.tableOrdernador.direction,
          this.tableOrdernador.active,
          this.tablePaginador.pageIndex);
      }),
      map((response: DataUnidadeEscolar) => {
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

  openDialog(unidade: UnidadeEscolar) {
    const formConfig = new MatDialogConfig();
    formConfig.panelClass = 'mat-dialog';
    formConfig.disableClose = false;
    formConfig.autoFocus = true;
    formConfig.data = unidade;

    const formularioCriarCargo = this.dialog.open(UnidadesFormComponent, formConfig);

    formularioCriarCargo.afterClosed().subscribe( (result: boolean) => {
      if (result === true) { this.tableUpdate(); }
    });
  }

}
