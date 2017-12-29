import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationalDetailsComponent } from './educationdetails.component';

const routes: Routes = [
    { path: '', component: EducationalDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducationalDetailsRoutingModule { }
