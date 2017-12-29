import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';
import { RoleGuard } from '../shared';

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
                path: 'bank/:id',
                loadChildren: './tracker/bank/bank.module#BankModule'
            },
            {
                path: 'family/:id',
                loadChildren: './tracker/family/family.module#FamilyModule'
            },
            {
                path: 'passport/:id',
                loadChildren: './tracker/passport/passport.module#PassportModule'
            },
            {
                path: 'education/:id',
                loadChildren: './tracker/education/education.module#EducationModule'
            },
            {
                path: 'experience/:id',
                loadChildren: './tracker/experience/experience.module#ExperienceModule'
            },
            {
                path: 'skills/:id',
                loadChildren: './tracker/skills/skills.module#SkillsModule'
            },
            {
                path: 'history/:id',
                loadChildren: './tracker/history/history.module#HistoryModule'
            },
            {
                path: 'resources',
                loadChildren: './resources/resources.module#ResourcesModule'
            },
            {
                path: 'resign/:id',
                loadChildren: './tracker/resign/resign.module#ResignModule'
            },
            {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule'
            },
            {
                path: 'addemployee',
                loadChildren: './admin/components/addemployee/addemployee.module#AddEmployeeModule'
            },
            {
                path: 'employee/:id',
                loadChildren: './employee/employee.module#EmployeeModule'
            },
            {
                path: 'reports',
                loadChildren: './reports/reports.module#ReportsModule'
            },
            {
                path: 'tables',
                loadChildren: './reports/components/tables/tables.module#TablesModule'
            },
            {
                path: 'experience',
                loadChildren: './reports/components/experience/experience.module#ExperienceModule'
            },
            {
                path: 'personaldetails',
                loadChildren: './reports/components/personaldetails/personaldetails.module#PersonalDetailsModule'
            },
            {
                path: 'educationdetails',
                loadChildren: './reports/components/educationdetails/educationdetails.module#EducationalDetailsModule'
            },
            {
                path: 'employeedetails',
                loadChildren: './reports/components/employeedetails/employeedetails.module#EmployeeDetailsModule'
            },
            {
                path: 'diversityratio',
                loadChildren: './reports/components/diversityratio/diversityratio.module#DiversityRatioModule'
            },
            {
                path: 'designation',
                loadChildren: './reports/components/designation/designation.module#DesignationCountModule'
            },
            {
                path: 'contactdetails',
                loadChildren: './reports/components/contactdetails/contactdetails.module#ContactDetailsModule'
            },
            {
                path: 'resources',
                loadChildren: './resources/resources.module#ResourcesModule'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
