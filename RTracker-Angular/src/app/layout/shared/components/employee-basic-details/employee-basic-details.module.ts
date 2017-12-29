import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeBasicDetailsComponent } from './employee-basic-details.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { AngularMultiSelectModule } from '../../../../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgbModule.forRoot(),
        AngularMultiSelectModule
    ],
    declarations: [
        EmployeeBasicDetailsComponent
    ],
    exports: [
        EmployeeBasicDetailsComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EmployeeBasicDetailsModule { }
