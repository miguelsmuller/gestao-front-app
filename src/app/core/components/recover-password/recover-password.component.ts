import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(private pageTitle: Title) {
    this.pageTitle.setTitle(environment.app_name + ' - Recuperação de senha');
  }

  ngOnInit(): void {
  }

}
