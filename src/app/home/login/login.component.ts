import {Component} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {HomeService} from "../home.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: NonNullableFormBuilder,
              private homeService: HomeService) {
  }

  loading = false;
  validateForm: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.loading = true;
      this.homeService.login(this.validateForm.value).subscribe(res => {
        console.log(res);
        this.loading = false;
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
