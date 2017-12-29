import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationalDetailsComponent } from './educationdetails.component';
import { EducationalDetailsRoutingModule } from './educationdetails-routing.module';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
@NgModule({
    imports: [
        CommonModule,
        EducationalDetailsRoutingModule,
        FormsModule,
        HttpModule,
        PageHeaderModule
    ],
    declarations: [EducationalDetailsComponent]
})
export class EducationalDetailsModule { }
