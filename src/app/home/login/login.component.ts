import {Component} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: NonNullableFormBuilder,
              private router: Router,
              private authService: AuthService) {
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
      this.authService.login(this.validateForm.value).subscribe(res => {
        localStorage.setItem('userData', JSON.stringify(res));
        this.router.navigate(['/portal'])
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
