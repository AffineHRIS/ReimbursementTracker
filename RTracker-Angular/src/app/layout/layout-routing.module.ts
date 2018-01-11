import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
    { path: '', redirectTo: '/basic', pathMatch: 'full' },
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: 'basic',
                loadChildren: './tracker/basic/basic.module#BasicModule'
            },
            {
                path: 'basic/:id',
                loadChildren: './tracker/basic/basic.module#BasicModule'
            },
            {
                path: 'signup',
                loadChildren: './signup/signup.module#SignupModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
