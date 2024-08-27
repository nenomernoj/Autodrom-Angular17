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

  isVisible = false;
  listOfData: any[] = [];
  total = 0;
  loading = false;
  orgName = '';
  selectedOrg: any = null;

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Организации', url: '/portal/orgs'},
    ]);
    this.getOrgs();
  }

  getOrgs(): void {
    this.loading = true;
    this.portalService.getOrgsList().subscribe(res => {
      this.total = res.body.count;
      this.listOfData = res.body.lists;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log(this.selectedOrg, this.orgName);
    if (this.selectedOrg) {
      this.portalService.editOrg({id: this.selectedOrg.id, name: this.orgName}).subscribe(res => {
        this.isVisible = false;
        this.getOrgs();
      });
    } else {
      this.portalService.addOrg({name: this.orgName}).subscribe(res => {
        this.isVisible = false;
        this.getOrgs();
      });

    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
