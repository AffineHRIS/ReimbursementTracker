import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { BasicComponent } from './basic.component';
import { BasicRoutingModule } from './basic-routing.module';
import { DataTableModule } from "angular2-datatable";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BasicRoutingModule,
        DataTableModule
    ],
    declarations: [
        BasicComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BasicModule { }
