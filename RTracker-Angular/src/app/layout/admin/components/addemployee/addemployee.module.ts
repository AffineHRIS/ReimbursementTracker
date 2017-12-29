import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeRoutingModule } from './addemployee-routing.module';
import { AddEmployeeComponent } from './addemployee.component';
import { PastWorkExperienceComponent } from './past-work-experience.component';
import { SkillDetailComponent } from './skill-detail.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from '../../../../shared';
import { EmployeeBasicDetailsModule } from '../../../shared';

@NgModule({
    imports: [
        AddEmployeeRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        AngularMultiSelectModule,
        EmployeeBasicDetailsModule
    ],
    declarations: [
        AddEmployeeComponent,
        PastWorkExperienceComponent,
        SkillDetailComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddEmployeeModule { }
