import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {carData} from "../mockData";
import {PortalService} from "../portal.service";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService,
              private fb: NonNullableFormBuilder,
              private message: NzMessageService,
              private portalService: PortalService,) {
  }

  selectedId: any = null;
  orgsList: any[] = [];
  categorysList: any[] = [];
  loading = false;
  validateForm: FormGroup<{
    brand: FormControl<string>;
    model: FormControl<string>;
    organizationId: FormControl<string>;
    year: FormControl<number>;
    vin: FormControl<string>;
    categoryId: FormControl<string>;
  }> = this.fb.group({
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]],
    organizationId: ['', [Validators.required]],
    year: [2024, [Validators.required]],
    vin: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
  });
  listOfData: any[] = [];
  isVisible = false;

  ngOnInit() {
    this.getExams();
    this.getOrgs();
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Автопарк', url: '/portal/cars'},
    ]);
    this.getVehicleList();
  }

  getVehicleList(): void {
    this.loading = true;
    this.portalService.getVehicleList().subscribe(res => {
      console.log(res);
      this.listOfData = res.body.lists;
      this.loading = false;
    })
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.loading = true;
      console.log('submit', this.validateForm.value);
      if (this.selectedId) {
        const data: any = this.validateForm.value;
        data.id = this.selectedId
        this.portalService.updateVenicle(data).subscribe(res => {
          this.message.success('Авто сохранено');
          this.validateForm.reset();
          this.getVehicleList();
          this.isVisible = false;
          this.loading = false;
        }, error => {
          this.loading = false;
        })
      } else {
        this.portalService.addVenicle(this.validateForm.value).subscribe(res => {
          this.message.success('Авто добавлено');
          this.validateForm.reset();
          this.getVehicleList();
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

  getOrgs(): void {
    this.portalService.getOrgsList().subscribe(res => {
      this.orgsList = res.body.lists;
    });
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

  editCar(data: any): void {
    this.validateForm.patchValue(data);
  }

  deleteCar(id: string): void {
    this.portalService.deleteVenicle({id}).subscribe(res => {
      console.log(res);
    });
    this.getVehicleList();
  }
}
