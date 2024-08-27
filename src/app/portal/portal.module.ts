import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {PortalRoutingModule} from "./portal-routing.module";
import {NzMessageModule} from "ng-zorro-antd/message";
import {WelcomeComponent} from './welcome/welcome.component';
import {LessonDetailComponent} from './exams/exam-details/lesson-detail/lesson-detail.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzButtonModule} from "ng-zorro-antd/button";
import {OrganizationsComponent} from './organizations/organizations.component';
import {ExamsComponent} from './exams/exams.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {ExamDetailsComponent} from './exams/exam-details/exam-details.component';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {StudentsComponent} from './students/students.component';
import {CarsComponent} from './cars/cars.component';
import {ResultsComponent} from './results/results.component';
import {ResultDetailsComponent} from './results/result-details/result-details.component';
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {DataService} from "./scheduler/data.service";
import ru from '@angular/common/locales/ru';
import {NZ_DATE_LOCALE, NZ_I18N, ru_RU} from "ng-zorro-antd/i18n";
import {SchedulerComponent} from './scheduler/scheduler.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {PortalComponent} from "./portal.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconDefinition} from "@ant-design/icons-angular";
import {DesktopOutline, PieChartOutline, ShopOutline, TeamOutline, UserOutline, CarOutline} from "@ant-design/icons-angular/icons";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
const icons: IconDefinition[] = [PieChartOutline, DesktopOutline, UserOutline, TeamOutline, ShopOutline, CarOutline];
registerLocaleData(ru);

@NgModule({
  declarations: [
    PortalComponent,
    WelcomeComponent,
    LessonDetailComponent,
    BreadcrumbsComponent,
    OrganizationsComponent,
    ExamsComponent,
    ExamDetailsComponent,
    StudentsComponent,
    CarsComponent,
    ResultsComponent,
    ResultDetailsComponent,
    SchedulerComponent,
  ],
  exports: [
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    NzIconModule.forRoot(icons),
    PortalRoutingModule,
    NzMessageModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzTableModule,
    CdkDropList,
    CdkDrag,
    NzGridModule,
    NzInputModule,
    DayPilotModule,
    NzModalModule,
    NzDropDownModule,
    NzAvatarModule,
    NzMenuModule,
    NzMessageModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NzLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzPopconfirmModule
  ],
  providers: [
    DataService,
    {provide: NZ_I18N, useValue: ru_RU},
    {provide: NZ_DATE_LOCALE, useValue: ru},
  ]
})
export class PortalModule {
}
