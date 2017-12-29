import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SkillsComponent } from './skills.component';
import { SkillsFormComponent } from './skills-form.component';
import { SkillDetailComponent } from './skill-detail.component';
import { SkillsRoutingModule } from './skills-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SkillsRoutingModule
    ],
    declarations: [
        SkillsComponent,
        SkillsFormComponent,
        SkillDetailComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SkillsModule { }
