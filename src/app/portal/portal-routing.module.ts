import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PortalComponent} from "./portal.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {LessonDetailComponent} from "./lessons/lesson-detail/lesson-detail.component";
import {OrganizationsComponent} from "./organizations/organizations.component";
import {OrgDetailsComponent} from "./organizations/org-details/org-details.component";

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
        path: "lessons/lesson-details",
        component: LessonDetailComponent
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
