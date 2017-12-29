import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HistoryComponent } from './history.component';
import { HistoryFormComponent } from './history-form.component';
import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HistoryRoutingModule
    ],
    declarations: [
        HistoryComponent ,
        HistoryFormComponent
    ]
})
export class HistoryModule { }
