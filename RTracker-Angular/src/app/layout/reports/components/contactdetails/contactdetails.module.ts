import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDetailsComponent } from './contactdetails.component';
import { ContactDetailsRoutingModule } from './contactdetails-routing.module';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
import { FilterComponent } from './filter.component';
import { DataTableModule } from "angular2-datatable";
@NgModule({
    imports: [
        CommonModule,
        ContactDetailsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        PageHeaderModule,
        DataTableModule
    ],
    declarations: [
      ContactDetailsComponent,
      FilterComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContactDetailsModule { }
