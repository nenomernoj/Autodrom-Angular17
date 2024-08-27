import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BreadcrumbService} from "../../breadcrumbs.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {PortalService} from "../../portal.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.scss'
})
export class ExamDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private portalService: PortalService,
              private message: NzMessageService,
              private breadcrumbService: BreadcrumbService) {
  }

  examId: any = null;
  loading = false;
  lessonsList: any[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examId = params.get('id');
      this.getLessonsByExam();
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log(event);
    moveItemInArray(this.lessonsList, event.previousIndex, event.currentIndex);
    this.lessonsList = event.container.data.map((item: any, index) => {
      return {
        id: item.id,
        name: item.name,
        order: index,
        organizationId: item.organizationId
      }
    })
    this.updateList();
  }

  getLessonsByExam(): void {
    this.loading = true;
    this.portalService.getLessonsByExam(this.examId).subscribe(res => {
      this.loading = false;
      console.log(res);
      this.lessonsList = res.body;
    }, err => {
      this.loading = false;
    })
  }

  updateList(): void {
    this.loading = true;
    this.portalService.updateOrderListByExam(this.lessonsList).subscribe(res => {
      this.loading = false;
      this.message.success('Порядок сохранен');
      this.getLessonsByExam();
    }, err => {
      this.loading = false;
    })
  }

  openDetails(data: any): void {
    console.log(data);
    // @ts-ignore
    const localBreadCrumbs = JSON.parse(localStorage.getItem('breadcrumbs'));
    console.log(localBreadCrumbs);
    localBreadCrumbs.push({
      label: data.name,
      url: '/portal/exams/' + this.examId + '/' + data.id,
    });
    console.log(localBreadCrumbs);
    this.breadcrumbService.setBreadcrumbs(localBreadCrumbs);
    this.router.navigate(['/portal/exams/', this.examId, data.id]);
  }
}
