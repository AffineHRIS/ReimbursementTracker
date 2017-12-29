import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ResignComponent } from './resign.component';
import { ResignRoutingModule } from './resign-routing.module';
import { ResignUpdateFormComponent } from './resign-update-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ResignRoutingModule
    ],
    declarations: [
        ResignComponent,
        ResignUpdateFormComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ResignModule { }
