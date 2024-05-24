import {Component} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {HomeService} from "../home.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private fb: NonNullableFormBuilder,
              private notif: NzNotificationService,
              private homeService: HomeService) {
  }

  loading = false;

  validateForm: FormGroup<{
    iin: FormControl<string>;
    fullName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    iin: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.loading = true;
      this.homeService.register(this.validateForm.value).subscribe(res => {
        this.loading = false;
        this.validateForm.reset();
        this.notif.success('Вы успешно зарегистрировались', 'Используйте ИИН и пароль для входа в систему');
      }, err => {
        this.loading = false;
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
}
