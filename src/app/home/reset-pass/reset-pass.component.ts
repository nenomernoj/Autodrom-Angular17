import {Component} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.scss'
})
export class ResetPassComponent {
  constructor(private fb: NonNullableFormBuilder,
              private notif: NzNotificationService,
              private authService: AuthService) {
  }

  loading = false;
  validateForm: FormGroup<{
    login: FormControl<string>;
  }> = this.fb.group({
    login: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.loading = true;
      this.authService.resetPassword(this.validateForm.value).subscribe(res => {
        this.loading = false;
        this.notif.success('Пароль сброшен', 'На вашу почту вымлано пиьсмо');
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
