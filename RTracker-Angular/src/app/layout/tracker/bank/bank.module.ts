import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BankComponent } from './bank.component';
import { BankRoutingModule } from './bank-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BankRoutingModule
    ],
    declarations: [ BankComponent ]
})
export class BankModule { }
