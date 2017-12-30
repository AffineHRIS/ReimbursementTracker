import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { BasicComponent } from './basic.component';
import { BasicRoutingModule } from './basic-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BasicRoutingModule,
    ],
    declarations: [
        BasicComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BasicModule { }
