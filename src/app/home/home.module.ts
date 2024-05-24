import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {IconDefinition} from "@ant-design/icons-angular";
import {UserOutline, LockOutline} from '@ant-design/icons-angular/icons';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzNotificationModule} from "ng-zorro-antd/notification";
const icons: IconDefinition[] = [UserOutline, LockOutline];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPassComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzNotificationModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzButtonComponent,
    NzInputDirective,
    NzIconModule.forChild(icons),
  ]
})
export class HomeModule { }
