import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsTabContentComponent } from './layout/resources/components/projects-tab-content/projects-tab-content.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    AuthGuard, EmployeeService, EmployeeDetailsService, AuthenticateService, EmployeeIdNameService,
    RoleGuard, EmployeeDetailsByIdService, empEduReportsService, empExpReportsService,
    personalDetailsReportsService,educationalDetailsReportsService, Globals, ServerService, CommonDataStreamService,
    companyProjectService
} from './shared';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        HttpClientModule,
    ],
    providers: [
      AuthGuard,
      RoleGuard,
      EmployeeService,
      EmployeeDetailsService,
      EmployeeIdNameService,
      EmployeeDetailsByIdService,
      empEduReportsService,
      empExpReportsService,
      ServerService,
      AuthenticateService,
      personalDetailsReportsService,
      educationalDetailsReportsService,
      Globals,
      CommonDataStreamService,
      companyProjectService,
      ProjectsTabContentComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
