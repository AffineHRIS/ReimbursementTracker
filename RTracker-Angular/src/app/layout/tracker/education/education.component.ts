import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeDetailsService, ServerService, CommonDataStreamService } from '../../../shared';
import { Education } from './education.interface';

@Component({
    selector: 'education-details',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.scss']
})
export class EducationComponent {

    employeeid: string;

    hideEditButton: boolean = false;
    hideSaveButton: boolean = true;
    hideCancelButton: boolean = true;

    disableSaveButton : boolean = true;
    disableInputs: boolean = true;

    origDetails: any = {};
    educationDetails: any = {};
    dataStream :any;
    @ViewChild('f') form: any;

    constructor(
        private empDetService: EmployeeDetailsService,
        private serverService: ServerService,
        private route: ActivatedRoute,
        private commonDataStreamService : CommonDataStreamService
    ) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
           this.employeeid = params['id'];
           if ( this.employeeid === undefined ) {
               this.employeeid = sessionStorage.getItem('username');
           }
           this.getDetails();
           this.dataStream = this.commonDataStreamService.dataStream;
        });
    }

    getDetails(): any {
        this.empDetService.getEducationDetails(this.employeeid).then(result => {
            this.origDetails = Object.assign({}, result.data[0]);
            this.educationDetails = Object.assign({}, result.data[0]);
        });
    }

    cancelEdit(success: boolean = false): boolean {
        this.hideEditButton = false;
        this.hideSaveButton = true;
        this.hideCancelButton = true;
        this.disableInputs = true;
        if (!success) {
            this.educationDetails = Object.assign({}, this.origDetails);
        }
        return false;
    }

    enableEdit(): boolean {
        this.hideEditButton = true;
        this.hideSaveButton = false;
        this.hideCancelButton = false;
        this.disableInputs = false;
        return false;
    }

    allowSave(model: Education): boolean {
        let modifiedDetails = JSON.stringify(model);
        let orignalDetails = JSON.stringify(this.origDetails);
        return modifiedDetails === orignalDetails;
    }

    save(model: Education):void {

        if (this.form.valid) {

            var modelData = Object.assign({}, model);
            // console.log( modelData );
            modelData.Employee_Id = this.employeeid;

            this.serverService.updateEducationDetails(modelData)
            .subscribe(
                (response) =>{
                    let body = response.json();
                    this.cancelEdit(true);
                    alert(body.message);
                },
                (error) => {
                    alert(error);
                    console.log(error);
                }
            );
        }
        else {
            alert("Required fields are manadatory")
        }

    }

    index: any = -1;

    showForm(i): void {
        this.index = i;
    }

    hideForm(i): boolean {
        return this.index === i;
    }

}
