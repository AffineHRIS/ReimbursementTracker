import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDetailsComponent } from './personaldetails.component';
import { PersonalDetailsRoutingModule } from './personaldetails-routing.module';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
import { FilterComponent } from './filter.component';
import { DataTableModule } from "angular2-datatable";
@NgModule({
    imports: [
        CommonModule,
        PersonalDetailsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        PageHeaderModule,
        DataTableModule
    ],
    declarations: [PersonalDetailsComponent,FilterComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PersonalDetailsModule { }
