import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from "@angular/http";
import { DataTableModule } from "angular2-datatable";
import { FilterComponent } from './filter.component';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        PageHeaderModule,
        DataTableModule
    ],
    declarations: [
        TablesComponent,
        FilterComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TablesModule { }
