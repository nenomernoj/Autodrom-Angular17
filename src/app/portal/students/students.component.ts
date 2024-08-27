import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {PortalService} from "../portal.service";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService,
              private fb: NonNullableFormBuilder,
              private message: NzMessageService,
              private portalService: PortalService,) {
  }

  loading = false;
  selectedId: any = null;
  categorysList: any[] = [];
  validateForm: FormGroup<{
    fullName: FormControl<string>;
    iin: FormControl<string>;
    birthDate: FormControl<Date>;
    drivingSchool: FormControl<string>;
    categoryId: FormControl<string>;
  }> = this.fb.group({
    fullName: ['', [Validators.required]],
    iin: ['', [Validators.required]],
    birthDate: [new Date(), [Validators.required]],
    drivingSchool: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
  });
  listOfData: any[] = [];
  isVisible = false;

  ngOnInit() {
    this.getList();
    this.getExams();
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Экзаменуемые', url: '/portal/students'},
    ]);
  }

  getList(): void {
    this.portalService.getStudents().subscribe(res => {
      console.log(res);
      this.listOfData = res.body.lists
    })
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.loading = true;
      console.log('submit', this.validateForm.value);
      if (this.selectedId) {
        const data: any = this.validateForm.value;
        data.id = this.selectedId
        this.portalService.updateStudent(data).subscribe(res => {
          this.message.success('Экзаменуемый сохранен');
          this.validateForm.reset();
          this.getList();
          this.isVisible = false;
          this.loading = false;
        }, error => {
          this.loading = false;
        })
      } else {
        this.portalService.addStudent(this.validateForm.value).subscribe(res => {
          this.message.success('Экзаменуемый добавлен');
          this.validateForm.reset();
          this.getList();
          this.loading = false;
          this.isVisible = false;
        }, error => {
          this.loading = false;
        })
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getExams(): void {
    this.portalService.getExamsList().subscribe(res => {
      console.log(res);
      this.categorysList = res.body;
    })
  }

  renderCategory(id: string): string {
    const category = this.categorysList.find((el: any) => el.id === id);
    return category ? category.code : id;
  }

  editStudent(data: any): void {
    this.validateForm.patchValue(data);
  }
  deleteStudent(id: string): void {
    this.portalService.deleteStudent({id}).subscribe(res => {
      console.log(res);
    });
    this.getList();
  }

}
