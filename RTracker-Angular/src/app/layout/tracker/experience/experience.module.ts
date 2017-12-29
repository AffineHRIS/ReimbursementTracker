import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ExperienceComponent } from './experience.component';
import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceFormComponent } from './experience-form.component';
import { PastWorkExperienceComponent } from './past-work-experience.component';
import { HistoryComponent } from '../history/history.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ExperienceRoutingModule
    ],
    declarations: [
        ExperienceComponent,
        ExperienceFormComponent,
        PastWorkExperienceComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ExperienceModule { }
