import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {PortalService} from "../portal.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService,
              private portalService: PortalService,) {
  }

  listOfData: any[] = [];

  ngOnInit() {
    this.getResults();
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Результаты', url: '/portal/results'},
    ]);
  }

  getResults(): void {
    this.portalService.getResults().subscribe(res => {
      console.log(res)
      this.listOfData = res.body.lists;
    })
  }
}
