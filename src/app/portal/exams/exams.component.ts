import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {drivingLicenses} from "../mockData";

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
  }

  listOfData = drivingLicenses;

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Экзамены', url: '/portal/exams'},
    ]);
  }
}
