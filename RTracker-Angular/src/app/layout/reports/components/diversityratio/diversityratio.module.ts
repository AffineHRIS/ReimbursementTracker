import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiversityRatioComponent } from './diversityratio.component';
import { DiversityRatioRoutingModule } from './diversityratio-routing.module';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
@NgModule({
    imports: [
        CommonModule,
        DiversityRatioRoutingModule,
        FormsModule,
        HttpModule,
        PageHeaderModule
    ],
    declarations: [DiversityRatioComponent]
})
export class DiversityRatioModule { }
