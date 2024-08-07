import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../breadcrumbs.service";
import {examResults} from "../../mockResultsExam";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrl: './result-details.component.scss'
})
export class ResultDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
  }

  listOfData = examResults;
  result: any = {};

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pathId = params.get('id');
      // Теперь вы можете использовать this.lessonId в вашем компоненте
      this.result = this.listOfData.find((el: any) => el.id == pathId);
      const label = this.result.student.name;
      this.breadcrumbService.setBreadcrumbs([
        {label: 'Главная', url: '/portal'},
        {label: 'Результаты', url: '/portal/results'},
        {label: label, url: '/portal/results/' + pathId},
      ]);
    });
  }
}

