import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeDetailsService, CommonDataStreamService } from '../../../shared';

@Component({
    selector: 'skills-details',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

    employeeid: string;

    skillsDetails: any = [];
    dataStream: any;
    hideEditButton : boolean = false;
    constructor(
        private empDetService: EmployeeDetailsService,
        private cds: CommonDataStreamService,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
           this.employeeid = params['id'];
           if ( this.employeeid === undefined ) {
               this.employeeid = sessionStorage.getItem("username");
           }
           this.getDetails();
           this.dataStream = this.cds.dataStream;
        });
    }



    getDetails(): any {
        this.empDetService.getSkillsDetails(this.employeeid).then(result => {
            this.skillsDetails = result.data;
        });
    }

    //** Control skills-form component **//
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
    //** Control skills-form component **//

}
