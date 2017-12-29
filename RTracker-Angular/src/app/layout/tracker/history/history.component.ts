import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeDetailsService, CommonDataStreamService, ServerService } from '../../../shared';
import { History } from './history.interface';

@Component({
    selector: 'history-details',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

    employeeid: string;

    historyDetails:any = [];
    otherDetails: any = { experiences: { prior: '0', affine: '0', total: '0' } };
    dataStream: any;
    moreDetailsButtonText: string = 'Show more details';
    hideMoreDetails: boolean = true;
    Current_Designation: any;
    Company_History_Start_date: any;
    Current_Location: any;
    Rating: any;
    Project_Id: any;
    Company_History_End_date: any;
    Current_CTC: any;
    

    constructor(
        private empHisService: EmployeeDetailsService,
        private route: ActivatedRoute,
        private cds : CommonDataStreamService,
        private serverService: ServerService
    ) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
           this.employeeid = params['id'];
           this.dataStream = this.cds.dataStream;
           this.getDetails();
        });
    }

    getDetails(): any {
        this.empHisService.getHistoryDetails(this.employeeid).then(result => {
            this.historyDetails = Object.assign([], result.data);
            this.otherDetails = result.details;
        });
    }

    fetchAppraisal(index): any {
        var appraisal: any;
        if( index > 0 ) {
            let oldCTC = parseFloat(this.otherDetails.appraisals[index-1].CTC), newCTC = parseFloat(this.otherDetails.appraisals[index].CTC);
            appraisal = (( ( newCTC - oldCTC ) * 100 ) / oldCTC).toFixed(2) + "%";
        } else {
            appraisal = '-';
        }
        return appraisal;
    }

    getRatingText( rating ): string {
        var ratingText = '-NA-';

        switch( rating ) {
            case '1': ratingText = 'Poor'; break;
            case '2': ratingText = 'Average'; break;
            case '3': ratingText = 'Excellent'; break;
            default: ratingText = '-NA-';
        }

        return ratingText;
    }

    toggleMoreDetails(): void {
        this.hideMoreDetails = !this.hideMoreDetails;
        this.moreDetailsButtonText = this.hideMoreDetails ? 'Show more details': 'Hide more details';
    }

    //** Control history-form component **//
    @ViewChild('histForm') form: any;
    index: any = -1;
    showEditForm(i): void {
        this.index = i;
        this.hideHistoryForm();
    }
    cancelEditForm(): void {
        this.index = -1;
    }
    hideForm(i): boolean {
        return this.index === i;
    }
    //** Control history-form component **//

    //** Control new history form **//
    hideNewHistoryForm = true;
    showHistoryForm(): boolean {
        this.hideNewHistoryForm = false;
        this.cancelEditForm();
        return false;
    }
    hideHistoryForm(): boolean {
        this.hideNewHistoryForm = true;
        return false;
    }
    //** Control new history form **//



    onSubmit(model: any): void{

        if (this.form.valid) {

            model.Employee_Id = this.employeeid;
            // console.log( model );

            this.serverService.addEmpHistoryDetails(model)
            .subscribe(
                (response) =>{
                    let body = response.json();
                    this.hideHistoryForm();
                    this.getDetails();
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
    //** Control new history form **//

}
