import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeDetailsByIdService, EmployeeDetails, Globals } from '../../shared';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    animations: [routerTransition()]
})
export class EmployeeComponent implements OnInit {
    id: number;
    private sub: any;
    empDetails: EmployeeDetails;
    imgSrcPath: string = '';

    constructor(
        private route: ActivatedRoute,
        private empDetailsById: EmployeeDetailsByIdService,
        private globals: Globals
    ) {
        this.imgSrcPath = 'http://'+ this.globals.apiServerIP +':3100/static/';
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.id = params['id'];
           this.imgSrcPath += this.id +'.jpg';
           this.getEmployeeDetailsById(this.id);
        });
    }

    getEmployeeDetailsById(id: number): void {
        this.empDetailsById.getEmployeeDetailsById(id).then(result => {
            this.empDetails = result[0].data[0];
        });
    }

}
