import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "../../breadcrumbs.service";
import {drivingLicenses, lessonsList} from "../../mockData";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.scss'
})
export class ExamDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
  }
  exam:any ={};
  drivingLicenses = drivingLicenses;
  lessonsList = lessonsList;
  todo = this.lessonsList.slice(0, 7);  // Первые 7 элементов
  done = this.lessonsList.slice(7);     // Оставшиеся элементы
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pathId = params.get('id');
      // Теперь вы можете использовать this.lessonId в вашем компоненте
      this.exam = this.drivingLicenses.find((el: any) => el.title === pathId);
      this.breadcrumbService.setBreadcrumbs([
        {label: 'Главная', url: '/portal'},
        {label: 'Экзамены', url: '/portal/exams'},
        {label: this.exam ? this.exam.title : '', url: '/portal/exams/' + pathId},
      ]);
    });
  }
  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
