import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Cargo } from '@project/shared/interfaces/cargo';
import { CargoService } from '@project/shared/services/cargo.service';

import { CargosFormComponent } from '../cargos-form/cargos-form.component';

@Component({
  selector: 'app-cargos-list',
  templateUrl: './cargos-list.component.html',
  styleUrls: ['./cargos-list.component.scss']
})
export class CargosListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) tablePaginador: MatPaginator;
  @ViewChild(MatSort) tableOrdernador: MatSort;
  @ViewChild('searchKeyword') searchKeyword: ElementRef;

  screenInLoading = true;

  dataSource: Cargo[] = [];
  dataSourceColumns: string[] = ['nome', 'inativo', 'created_at'];
  dataSourcePerPage = 0;
  dataSourceTotal = 0;

  constructor(
    private dialog: MatDialog,
    private cargoService: CargoService ) { }

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

          return this.cargoService.getCargos(
          this.searchKeyword.nativeElement.value,
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
      ).subscribe(response => this.dataSource = response);
  }

  openDialog(cargo: Cargo) {
    const formularioConfiguracao = new MatDialogConfig();
    formularioConfiguracao.panelClass = 'mat-dialog';
    formularioConfiguracao.disableClose = false;
    formularioConfiguracao.autoFocus = true;
    formularioConfiguracao.data = cargo;

    const formularioCriarCargo = this.dialog.open(CargosFormComponent, formularioConfiguracao);

    formularioCriarCargo.afterClosed().subscribe( (result: boolean) => {
      if (result === true) { this.tableUpdate(); }
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft') { this.tablePrevious(); }
    if (event.code === 'ArrowRight') { this.tableNext(); }
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

}
