import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { BasicComponent } from './basic.component';
import { BasicRoutingModule } from './basic-routing.module';
import { AngularMultiSelectModule } from '../../../shared';
import { EmployeeBasicDetailsModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BasicRoutingModule,
        AngularMultiSelectModule,
        EmployeeBasicDetailsModule
    ],
    declarations: [
        BasicComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BasicModule { }
