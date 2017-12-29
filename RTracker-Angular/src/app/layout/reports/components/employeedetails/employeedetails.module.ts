import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employeedetails.component';
import { EmployeeDetailsRoutingModule } from './employeedetails-routing.module';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EmployeeDetailsRoutingModule
    ],
    declarations: [EmployeeDetailsComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EmployeeDetailsModule { }
