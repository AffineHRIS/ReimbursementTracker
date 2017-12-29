import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiversityRatioComponent } from './diversityratio.component';

const routes: Routes = [
    { path: '', component: DiversityRatioComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiversityRatioRoutingModule { }
