import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ResetPassComponent} from "./reset-pass/reset-pass.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: "",
                component: LoginComponent
            },
          {
            path: "register",
            component: RegisterComponent
          },
          {
            path: "reset-password",
            component: ResetPassComponent
          }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
