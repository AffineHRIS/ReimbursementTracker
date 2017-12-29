import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FamilyComponent } from './family.component';
import { FamilyRoutingModule } from './family-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FamilyRoutingModule
    ],
    declarations: [ FamilyComponent ]
})
export class FamilyModule { }
