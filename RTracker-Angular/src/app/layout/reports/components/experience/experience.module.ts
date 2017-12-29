import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience.component';
import { ExperienceRoutingModule } from './experience-routing.module';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpModule} from "@angular/http";
import { FilterComponent } from './filter.component';
import { DataTableModule } from "angular2-datatable";

@NgModule({
    imports: [
        CommonModule,
        ExperienceRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        PageHeaderModule,
        DataTableModule
    ],
    declarations: [
        ExperienceComponent,
        FilterComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ExperienceModule { }
