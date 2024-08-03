import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../breadcrumbs.service";

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrl: './org-details.component.scss'
})
export class OrgDetailsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Организации', url: '/portal/orgs'},
      {label: 'Добавить', url: '/portal/orgs/org-details'},
    ]);
  }
}
