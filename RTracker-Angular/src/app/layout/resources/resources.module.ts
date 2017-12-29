import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './resources.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { ProjectListComponent } from './components/projects-tab-content/project-list.component';
import { ProjectsTabContentComponent } from './components/projects-tab-content/projects-tab-content.component';
import { ResourcesTabContentComponent } from './components/resources-tab-content/resources-tab-content.component';
import { ResourceEditFormComponent } from './components/resources-tab-content/resource-edit-form.component';
import { DataTableModule } from "angular2-datatable";
@NgModule({
    imports: [
        CommonModule,
        ResourcesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgbModule.forRoot(),
        DataTableModule
    ],
    declarations: [
        ResourcesComponent,
        ProjectListComponent,
        ProjectsTabContentComponent,
        ResourcesTabContentComponent,
        ResourceEditFormComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ResourcesModule { }
