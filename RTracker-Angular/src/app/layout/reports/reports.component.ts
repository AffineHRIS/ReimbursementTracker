import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeDetailsByIdService, EmployeeDetails } from '../../shared';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    animations: [routerTransition()]
})
export class ReportsComponent implements OnInit {

    constructor(private route: ActivatedRoute, private empDetailsById: EmployeeDetailsByIdService) {

    }

    ngOnInit() {

    }

    getEmployeeDetailsById(id: number): void {

    }

}
