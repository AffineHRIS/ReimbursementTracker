import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeBasicDetailsComponent } from './employee-basic-details.component';

const routes: Routes = [
    { path: '', component: EmployeeBasicDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeBasicDetailsRoutingModule { }
