import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private pageTitle: Title) {
    this.pageTitle.setTitle(environment.app_name + ' - Dashboard');
  }

  ngOnInit(): void {
  }

}
