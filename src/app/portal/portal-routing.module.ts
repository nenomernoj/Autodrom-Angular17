import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PortalComponent} from "./portal.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {LessonDetailComponent} from "./lessons/lesson-detail/lesson-detail.component";
import {OrganizationsComponent} from "./organizations/organizations.component";
import {OrgDetailsComponent} from "./organizations/org-details/org-details.component";
import {ExamsComponent} from "./exams/exams.component";
import {ExamDetailsComponent} from "./exams/exam-details/exam-details.component";
import {StudentsComponent} from "./students/students.component";

import {CarsComponent} from "./cars/cars.component";
import {ResultsComponent} from "./results/results.component";
import {ResultDetailsComponent} from "./results/result-details/result-details.component";
import {SchedulerComponent} from "./scheduler/scheduler.component";

const routes: Routes = [
  {
    path: "",
    component: PortalComponent,
    children: [
      {
        path: "",
        component: WelcomeComponent
      },
      {
        path: "orgs",
        component: OrganizationsComponent
      },
      {
        path: "orgs/org-details",
        component: OrgDetailsComponent
      },
      {
        path: "lessons",
        component: LessonsComponent
      },
      {
        path: "lessons/:id",
        component: LessonDetailComponent
      },
      {
        path: "exams",
        component: ExamsComponent
      },
      {
        path: "exams/:id",
        component: ExamDetailsComponent
      },
      {
        path: "students",
        component: StudentsComponent
      },
      {
        path: "cars",
        component: CarsComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      },
      {
        path: 'results/:id',
        component: ResultDetailsComponent
      },
      {
        path: 'scheduler',
        component: SchedulerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule {
}
