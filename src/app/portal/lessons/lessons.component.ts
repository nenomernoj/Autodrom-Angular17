import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {lessonsList} from "../mockData";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
  }

  listOfData = lessonsList;

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Упражнения', url: '/portal/lessons'},
    ]);
  }
}
