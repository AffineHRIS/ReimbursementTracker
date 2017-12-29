import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { PassportComponent } from './passport.component';
import { PassportRoutingModule } from './passport-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PassportRoutingModule
    ],
    declarations: [ PassportComponent ]
})
export class PassportModule { }
