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


@NgModule({
  declarations: [
    WelcomeComponent,
    LessonsComponent,
    LessonDetailComponent,
    BreadcrumbsComponent,
    OrganizationsComponent,
    OrgDetailsComponent
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
    NzButtonComponent
  ]
})
export class PortalModule {
}
