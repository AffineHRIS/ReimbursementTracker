import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResignComponent } from './resign.component';

const routes: Routes = [
    { path: '', component: ResignComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ResignRoutingModule { }
