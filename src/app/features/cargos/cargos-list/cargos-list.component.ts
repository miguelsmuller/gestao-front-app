import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { merge, of, Observable, fromEvent, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Cargo, DataCargo } from '@app/shared/models/cargo';
import { CargoService } from '@app/shared/services/cargo.service';
import { CargosFormComponent } from '@app/features/cargos/cargos-form/cargos-form.component';

@Component({
  selector: 'app-cargos-list',
  templateUrl: './cargos-list.component.html',
  styleUrls: ['./cargos-list.component.scss']
})
export class CargosListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) tablePaginador: MatPaginator;
  @ViewChild(MatSort) tableOrdernador: MatSort;
  @ViewChild('tableSearchKeyword') tableSearchKeyword: ElementRef;

  screenInLoading = true;

  unSubscribeAllObservables$: Subject<any> = new Subject();

  dataSource$: Observable<Cargo[]>;
  dataSourceColumns: string[] = ['nome', 'inativo', 'created_at'];
  dataSourcePerPage = 0;
  dataSourceTotal = 0;

  constructor(
    private dialog: MatDialog,
    private cargoService: CargoService
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

        return this.cargoService.getCargos(
          this.tableSearchKeyword.nativeElement.value,
          this.tableOrdernador.direction,
          this.tableOrdernador.active,
          this.tablePaginador.pageIndex);
      }),
      map((response: DataCargo) => {
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

  openDialog(cargo: Cargo) {
    const formConfig = new MatDialogConfig();
    formConfig.panelClass = 'mat-dialog';
    formConfig.disableClose = false;
    formConfig.autoFocus = true;
    formConfig.data = cargo;

    const formularioCriarCargo = this.dialog.open(CargosFormComponent, formConfig);

    formularioCriarCargo.afterClosed().subscribe( (result: boolean) => {
      if (result === true) { this.tableUpdate(); }
    });
  }
}
