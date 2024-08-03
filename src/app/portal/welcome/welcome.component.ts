import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
    ]);
  }
}
