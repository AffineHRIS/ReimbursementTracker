import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationCountComponent } from './designation.component';
import { DesignationCountRoutingModule } from './designation-routing.module';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
@NgModule({
    imports: [
        CommonModule,
        DesignationCountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        PageHeaderModule
    ],
    declarations: [DesignationCountComponent]
})
export class DesignationCountModule { }
