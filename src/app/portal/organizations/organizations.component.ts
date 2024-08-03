import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {PortalService} from "../portal.service";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export class OrganizationsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService,
              private portalService: PortalService) {
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Организации', url: '/portal/orgs'},
    ]);
    this.getOrgs();
  }

  getOrgs(): void {
    this.portalService.getOrgsList().subscribe(res => {
      console.log(res);
    })
  }
}
