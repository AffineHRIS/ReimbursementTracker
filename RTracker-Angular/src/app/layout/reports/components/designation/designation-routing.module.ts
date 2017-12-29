import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationCountComponent } from './designation.component';

const routes: Routes = [
    { path: '', component: DesignationCountComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DesignationCountRoutingModule { }
