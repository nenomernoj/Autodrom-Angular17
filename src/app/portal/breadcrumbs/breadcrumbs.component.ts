import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
