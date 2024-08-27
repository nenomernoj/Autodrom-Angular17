import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: any[] = [];

  constructor(private breadcrumbService: BreadcrumbService,
              private router: Router) {
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
      console.log(breadcrumbs);
      if (breadcrumbs.length === 0) {
        // @ts-ignore
        const localBreadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs'));
        if (localBreadcrumbs) {
          this.breadcrumbs = localBreadcrumbs;
        }
      }
    });
  }

  goto(data: any, index: number): void {
    // @ts-ignore
    const localBreadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs'));
    const newBreadcrumbs = localBreadcrumbs.slice(0, index + 1);
    this.breadcrumbService.setBreadcrumbs(newBreadcrumbs);
    this.router.navigate([data.url])
  }
}
