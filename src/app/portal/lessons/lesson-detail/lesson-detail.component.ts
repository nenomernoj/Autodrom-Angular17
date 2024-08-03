import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../breadcrumbs.service";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Упражнения', url: '/portal/lessons'},
      {label: 'Добавить', url: '/portal/lessons/lesson-details'},
    ]);
  }
}
