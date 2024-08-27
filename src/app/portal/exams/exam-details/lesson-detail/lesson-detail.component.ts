import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../../breadcrumbs.service";
import {lessonsList} from "../../../mockData";
import {ActivatedRoute} from "@angular/router";
import {PortalService} from "../../../portal.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private portalService: PortalService,
              private breadcrumbService: BreadcrumbService) {
  }

  lessonId: any = {};
  taskList: any[] = [];
  loading = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('id');
      this.getTaskList();
    });
  }

  getTaskList(): void {
    this.loading = true;
    this.portalService.getTaskListByLessonId(this.lessonId).subscribe(res => {
      this.taskList = res.body;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  updateTaskList(): void {
    this.loading = true;
    this.portalService.updateTaskList(this.taskList).subscribe(res => {
      this.getTaskList();
    }, error => {
      this.loading = false;
    })
  }
}
