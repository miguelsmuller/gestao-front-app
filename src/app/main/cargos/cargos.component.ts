import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

import { CargoService } from './cargo.service';
import { Cargo, DataCargo } from './cargo';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements AfterViewInit  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnsToDisplay: string[] = ['nome', 'inativo', 'created_at'];
  dataFromObservable$: Observable<DataCargo> | null;
  data: Cargo[] = [];

  resultsLength = 0;
  perPage = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(
    private cargoService: CargoService
  ) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.cargoService.getCargos('',  this.sort.direction, this.sort.active, this.paginator.pageIndex);
        }),
        map(response => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.perPage = response.meta.per_page;
          this.resultsLength = response.meta.total;

          return response.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;

          return observableOf([]);
        })
      ).subscribe(response => this.data = response);

  }
}
