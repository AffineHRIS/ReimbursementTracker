import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeDetailsService, ServerService, CommonDataStreamService } from '../../../shared';
import { Family } from './family.interface';

@Component({
    selector: 'family-details',
    templateUrl: './family.component.html',
    styleUrls: ['./family.component.scss']
})
export class FamilyComponent {

    employeeid: string;

    Marital_Status : any;
    Is_Spouse_Employed : any;

    hideEditButton: boolean = false;
    hideSaveButton: boolean = true;
    hideCancelButton: boolean = true;

    disableSaveButton : boolean = true;
    disableInputs: boolean = true;
    disabled :boolean = true;
    origDetails: any = {};
    familyDetails: any = {};
    dataStream: any;

    @ViewChild('f') form: any;

    constructor(
        private empDetService: EmployeeDetailsService,
        private serverService: ServerService,
        private route: ActivatedRoute,
        private commonDataStreamService : CommonDataStreamService
    ) {}

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
        this.empDetService.getFamilyDetails(this.employeeid).then(result => {
            this.origDetails = Object.assign({}, result.data[0]);
            this.familyDetails = Object.assign({}, result.data[0]);

            if ( this.familyDetails.Spouse_Name !== null && this.familyDetails.Spouse_Name !== undefined ) {
                this.Marital_Status = 'Married';
            }
            else {
              this.Marital_Status = 'Single';
            }
        });
    }

    isMarried(): boolean {
        return this.Marital_Status === "Married";
    }

    isSpouseEmployed(): boolean {
        return this.familyDetails.Is_Spouse_Employed === 'Yes';
    }

    cancelEdit(success: boolean = false): boolean {
        this.hideEditButton = false;
        this.hideSaveButton = true;
        this.hideCancelButton = true;
        this.disableInputs = true;
        this.disabled = true;
        if (!success) {
            this.familyDetails = Object.assign({}, this.origDetails);
        }
        return false;
    }

    enableEdit(): boolean {
        this.hideEditButton = true;
        this.hideSaveButton = false;
        this.hideCancelButton = false;
        this.disableInputs = false;
        this.disabled = false;
        return false;
    }

    allowSave(model: Family): boolean {
        let modifiedDetails = JSON.stringify(model);
        let originalDetails = JSON.stringify(this.origDetails);
        return modifiedDetails === originalDetails;
    }

    save(model: any):void {

        if (this.form.valid) {

            this.serverService.updateEmpFamilyDetails(model)
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

}
