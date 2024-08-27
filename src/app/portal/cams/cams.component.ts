import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../breadcrumbs.service";
import {PortalService} from "../portal.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-cams',
  templateUrl: './cams.component.html',
  styleUrl: './cams.component.scss'
})
export class CamsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService,
              private fb: NonNullableFormBuilder,
              private message: NzMessageService,
              private portalService: PortalService,) {
  }

  carsList: any[] = [];
  typeList: any[] = [];
  listOfData: any[] = [];
  selectedId: any = null;
  loading = false;
  validateForm: FormGroup<{
    name: FormControl<string>;
    url: FormControl<string>;
    deviceType: FormControl<string>;
    vehicleId: FormControl<string>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    url: ['', [Validators.required]],
    deviceType: ['', [Validators.required]],
    vehicleId: ['', [Validators.required]],
  });
  isVisible = false;

  ngOnInit() {
    this.getCamTypes();
    this.getVehicleList();
    this.breadcrumbService.setBreadcrumbs([
      {label: 'Главная', url: '/portal'},
      {label: 'Камеры', url: '/portal/cams'},
    ]);
    this.getCams();
  }

  getCams(): void {
    this.portalService.getCams().subscribe(res => {
      console.log(res);
      this.listOfData = res.body.lists;
    })
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.loading = true;
      console.log('submit', this.validateForm.value);
      if (this.selectedId) {
        const data: any = this.validateForm.value;
        data.id = this.selectedId
        this.portalService.updateDevice(data).subscribe(res => {
          this.message.success('Камера сохранена');
          this.validateForm.reset();
          this.getCams();
          this.isVisible = false;
          this.loading = false;
        }, error => {
          this.loading = false;
        })
      } else {
        this.portalService.addDevice(this.validateForm.value).subscribe(res => {
          this.message.success('Камера добавлена');
          this.validateForm.reset();
          this.getCams();
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

  getCamTypes(): void {
    this.portalService.getEnum('DS.Shared.Data.Primitives.DeviceType').subscribe(res => {
      console.log(res);
      this.typeList = res.body;
    })
  }

  getVehicleList(): void {
    this.portalService.getVehicleList().subscribe(res => {
      console.log(res);
      this.carsList = res.body.lists;
      this.loading = false;
    })
  }

  editCam(data: any): void {
    this.validateForm.patchValue(data);
  }

  deleteCam(id: string): void {
    this.portalService.deleteDevice({id}).subscribe(res => {
      console.log(res);
    });
    this.getCams();
  }

  renderType(id: string): string {
    const category = this.typeList.find((el: any) => el.value === id);
    return category ? category.nameRu : id;
  }

  renderAuto(id: string): string {
    const category = this.carsList.find((el: any) => el.id === id);
    return category ? category.brand + ' ' + category.model : id;
  }
}
