import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortalRoutingModule} from "./portal-routing.module";
import {NzMessageModule} from "ng-zorro-antd/message";
import { WelcomeComponent } from './welcome/welcome.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonDetailComponent } from './lessons/lesson-detail/lesson-detail.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzButtonComponent} from "ng-zorro-antd/button";
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrgDetailsComponent } from './organizations/org-details/org-details.component';
import { ExamsComponent } from './exams/exams.component';
import {NzTableComponent} from "ng-zorro-antd/table";
import { ExamDetailsComponent } from './exams/exam-details/exam-details.component';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective} from "ng-zorro-antd/input";
import { StudentsComponent } from './students/students.component';
import { CarsComponent } from './cars/cars.component';
import { ResultsComponent } from './results/results.component';
import { ResultDetailsComponent } from './results/result-details/result-details.component';
import { SchedulerComponent } from './scheduler/scheduler.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    LessonsComponent,
    LessonDetailComponent,
    BreadcrumbsComponent,
    OrganizationsComponent,
    OrgDetailsComponent,
    ExamsComponent,
    ExamDetailsComponent,
    StudentsComponent,
    CarsComponent,
    ResultsComponent,
    ResultDetailsComponent,
    SchedulerComponent
  ],
  exports: [
    BreadcrumbsComponent
  ],
  imports: [
    PortalRoutingModule,
    CommonModule,
    NzMessageModule,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzButtonComponent,
    NzTableComponent,
    CdkDropList,
    CdkDrag,
    NzRowDirective,
    NzColDirective,
    NzInputDirective
  ]
})
export class PortalModule {
}
