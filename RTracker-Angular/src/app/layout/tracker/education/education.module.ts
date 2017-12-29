import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { EducationComponent } from './education.component';
import { EducationRoutingModule } from './education-routing.module';
import { FormTrainingComponent } from './form-training.component';
import { FormComponent } from './form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EducationRoutingModule
    ],
    declarations: [
        EducationComponent,
        FormTrainingComponent,
        FormComponent
    ]
})
export class EducationModule { }
