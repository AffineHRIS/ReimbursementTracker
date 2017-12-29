import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeDetailsService, CommonDataStreamService } from '../../../shared';
import { Experience } from './experience.interface';
import { HistoryComponent } from '../history/history.component';
@Component({
    selector: 'experience-details',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {

    employeeid: string;

    origDetails: any = {};
    experienceDetails: any = {};
    experienceDetailsInArray: any = [];
    dataStream: any;

    hideEditButton: boolean = false;
    otherDetails: any = { experiences: { prior: '0', affine: '0', total: '0' } };
    constructor(
        private empDetService: EmployeeDetailsService,
        private route: ActivatedRoute,
        private cds: CommonDataStreamService,
        private empHisService: EmployeeDetailsService,
    ) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
           this.employeeid = params['id'];

           this.getDetails();
           this.dataStream = this.cds.dataStream;
        });
    }

    getDetails(): any {
        this.empDetService.getExperienceDetails(this.employeeid).then(result => {
            this.origDetails = Object.assign({}, result.data[0]);
            this.experienceDetails = Object.assign({}, result.data[0]);
            this.experienceDetailsInArray = Object.assign([], result.data);
        });

        this.empHisService.getHistoryDetails(this.employeeid).then(result => {
            this.otherDetails = result.details;
        });
    }

    //** Control experience-form component **//
    index: any = -1;
    showEditForm(i): void {
        this.index = i;
    }
    showForm(i): void {
        this.index = i;
        this.hideEditButton = true;
    }
    cancelEditForm(): void {
        this.index = -1;
    }
    hideForm(i): boolean {
        return this.index === i;
    }
    //** Control experience-form component **//

}
