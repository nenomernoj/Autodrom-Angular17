import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../breadcrumbs.service";
import {lessonsList} from "../../mockData";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
  }
  lesson: any = {};
  lessonsList = lessonsList;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pathId = params.get('id');
      // Теперь вы можете использовать this.lessonId в вашем компоненте
      this.lesson = this.lessonsList.find((el: any) => el.path === pathId);
      this.breadcrumbService.setBreadcrumbs([
        {label: 'Главная', url: '/portal'},
        {label: 'Упражнения', url: '/portal/lessons'},
        {label: this.lesson ? this.lesson.title : '', url: '/portal/lessons/' + pathId},
      ]);
    });
  }
}
