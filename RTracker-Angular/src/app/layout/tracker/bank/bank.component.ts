import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeDetailsService, ServerService, CommonDataStreamService } from '../../../shared';
import { Bank } from './bank.interface';

@Component({
    selector: 'bank-details',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.scss']
})
export class BankComponent {

    employeeid: string;

    hideEditButton: boolean = false;
    hideSaveButton: boolean = true;
    hideCancelButton: boolean = true;

    disableSaveButton : boolean = true;
    disableInputs: boolean = true;

    origDetails: any = {};
    bankDetails: any = {};
    dataStream: any;

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
        });
        this.dataStream = this.commonDataStreamService.dataStream;
    }

    getDetails(): any {
        this.empDetService.getBankDetails(this.employeeid).then(result => {
            this.origDetails = Object.assign({}, result.data[0]);
            this.bankDetails = Object.assign({}, result.data[0]);
        });
    }

    cancelEdit(success: boolean = false): boolean {
        this.hideEditButton = false;
        this.hideSaveButton = true;
        this.hideCancelButton = true;
        this.disableInputs = true;
        if (!success) {
            this.bankDetails = Object.assign({}, this.origDetails);
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

    allowSave(model: Bank): boolean {
        let modifiedDetails = JSON.stringify(model);
        let orignalDetails = JSON.stringify(this.origDetails);
        return modifiedDetails === orignalDetails;
    }

    save(model: any):void {

        if (this.form.valid) {

            var modelData = Object.assign({}, model);
            console.log( modelData );

            this.serverService.updateEmpBankDetails(modelData)
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
