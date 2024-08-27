import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {drivingLicenses} from "../mockData";
import {PortalService} from "../portal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService,
              private portalService: PortalService,
              private router: Router) {
  }

  listOfData: any[] = [];

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Экзамены', url: '/portal/exams'},
    ]);
    this.getExams();
  }

  getExams(): void {
    this.portalService.getExamsList().subscribe(res => {
      console.log(res);
      this.listOfData = res.body;
    })
  }

  openExam(data: any): void {
    console.log(data);
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Экзамены', url: '/portal/exams'},
      {label: data.name, url: '/portal/exams/' + data.id},
    ]);
    this.router.navigate(['/portal/exams/' + data.id]);
  }
}
