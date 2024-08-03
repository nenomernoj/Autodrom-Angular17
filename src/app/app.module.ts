import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {ru_RU} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {FormsModule} from '@angular/forms';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from '@angular/common/http';
import {HomeComponent} from "./home/home.component";
import {ParamInterceptor} from "./api.interceptor";
import {AuthInterceptor} from "./auth.interceptor";
import { PortalComponent } from './portal/portal.component';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {IconDefinition} from '@ant-design/icons-angular';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {PieChartOutline, DesktopOutline, UserOutline, TeamOutline} from '@ant-design/icons-angular/icons';
import {NzAvatarComponent} from "ng-zorro-antd/avatar";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {PortalModule} from "./portal/portal.module";

const icons: IconDefinition[] = [PieChartOutline, DesktopOutline, UserOutline, TeamOutline];
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortalComponent
  ],
    imports: [
        NzIconModule.forRoot(icons),
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NzLayoutComponent,
        NzSiderComponent,
        NzMenuDirective,
        NzMenuItemComponent,
        NzIconDirective,
        NzSubMenuComponent,
        NzHeaderComponent,
        NzContentComponent,
        NzBreadCrumbItemComponent,
        NzFooterComponent,
        NzBreadCrumbComponent,
        NzAvatarComponent,
        NzDropdownMenuComponent,
        NzDropDownDirective,
        NzMenuDividerDirective,
        PortalModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: NZ_I18N, useValue: ru_RU},
    {provide: HTTP_INTERCEPTORS, useClass: ParamInterceptor, multi: true},
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
