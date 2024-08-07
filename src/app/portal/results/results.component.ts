import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {examResults} from "../mockResultsExam";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
  }

  listOfData = examResults;

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Результаты', url: '/portal/results'},
    ]);
  }
}
