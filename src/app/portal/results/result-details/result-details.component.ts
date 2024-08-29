import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../breadcrumbs.service";
import {examResults} from "../../mockResultsExam";
import {ActivatedRoute} from "@angular/router";
import {PortalService} from "../../portal.service";

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrl: './result-details.component.scss'
})
export class ResultDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private portalService: PortalService,
              private breadcrumbService: BreadcrumbService) {
  }
  categorysList: any[] = [];
  totalDeductions = 0;
  listOfData = examResults;
  result: any = {};
  resultId: any = null;
  examData: any;
  tasks: any[] = [];
  errorTasks: any[] = [];

  ngOnInit() {
    this.getExams();
    this.route.paramMap.subscribe(params => {
      this.resultId = params.get('id');
      this.getDetails();
      // Теперь вы можете использовать this.lessonId в вашем компоненте
      this.result = this.listOfData[0];
      this.breadcrumbService.setBreadcrumbs([
        {label: 'Главная', url: '/portal'},
        {label: 'Результаты', url: '/portal/results'},
      ]);
    });
  }
  getExams(): void {
    this.portalService.getExamsList().subscribe(res => {
      console.log(res);
      this.categorysList = res.body;
    })
  }
  getDetails(): void {
    this.portalService.getResultsById(this.resultId).subscribe(res => {
      this.examData = res.body;
      this.errorTasks = res.body.errorTasks;
      console.log(res);
      this.getAllTasks(res.body.student.categoryId)
    })
  }

  getAllTasks(examId: string): void {
    this.portalService.getTaskByExamId(examId).subscribe(res => {
      console.log(res);
      this.tasks = res.body;
    })
  }

  renderPoints(id: string, points: number): boolean {
    if (this.errorTasks.find(el => el.errorId === id)) {
      this.totalDeductions = this.totalDeductions + points;
      return true;
    } else {
      return false;
    }
  }
  renderCategory(id: string): string {
    const category = this.categorysList.find((el: any) => el.id === id);
    return category ? category.code : id;
  }
}

