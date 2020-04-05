import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external-layout',
  template: '<router-outlet></router-outlet>',
})
export class ExternalLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
