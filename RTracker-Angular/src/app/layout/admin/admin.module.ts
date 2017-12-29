import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        TranslateModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        AdminComponent,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
