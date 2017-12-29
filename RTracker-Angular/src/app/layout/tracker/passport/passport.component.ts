import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmployeeDetailsService, ServerService, CommonDataStreamService, Globals } from '../../../shared';
import { Passport } from './passport.interface';

@Component({
    selector: 'passport-details',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.scss']
})
export class PassportComponent {

    employeeid: string;

    hideEditButton: boolean = false;
    hideSaveButton: boolean = true;
    hideCancelButton: boolean = true;

    disableSaveButton : boolean = true;
    disableInputs: boolean = true;

    origDetails: any = {};
    passportDetails: any = {};

    dataStream: any;
    visaDetails:any = {};
    visaDetails2:any = {};
    visaDetails3:any = {};
    srcPath: any;
    srcPathVisa1: any;
    ppDocActPath: string = '';
    visaDocActPath: string = '';

    @ViewChild('f') form: any;

    constructor(
        private empDetService: EmployeeDetailsService,
        private serverService: ServerService,
        private route: ActivatedRoute,
        private commonDataStreamService : CommonDataStreamService,
        private globals: Globals
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
           this.employeeid = params['id'];
           if ( this.employeeid === undefined ) {
               this.employeeid = sessionStorage.getItem("username");
           }

           this.ppDocActPath = 'http://'+ this.globals.apiServerIP +':3100/api/Upload/Documents/' + this.employeeid;
           this.visaDocActPath = 'http://'+ this.globals.apiServerIP +':3100/api/Upload/Visa/' + this.employeeid;

           this.getDetails();
           this.dataStream = this.commonDataStreamService.dataStream;
        });
    }

    getDetails(): any {
        this.empDetService.getPassportDetails(this.employeeid).then(result => {
            if ( result[0] && result[0].data ) {
                this.passportDetails = Object.assign({}, result[0].data.passport_details[0]);

                this.visaDetails = Object.assign({}, result[0].data.visa1[0]);
                this.visaDetails2 = Object.assign({}, result[0].data.visa1[1]);
                this.visaDetails3 = Object.assign({}, result[0].data.visa1[2]);

                this.srcPath = this.passportDetails.PassportFile !== null ? ( 'http://'+ this.globals.apiServerIP +':3100/passport/' + this.passportDetails.PassportFile ) : '';
                this.srcPathVisa1 = this.visaDetails.VisaFile !== null ? ( 'http://'+ this.globals.apiServerIP +':3100/passport/' + this.visaDetails.VisaFile ) : '';
            }
        });
    }

    // Image upload preview
    previewImage(event){
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (e: any) => {
                this.srcPath = e.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    previewVisa(event){
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (e: any) => {
                this.srcPathVisa1 = e.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    hideIframe = true;
    hideIframeVisa = true;
    updateImageStatus(){
        this.hideIframe = false;
    }
    updateImageStatusVisa(){
        this.hideIframeVisa = false;
    }
    // Image upload preview
    cancelEdit(success: boolean = false): boolean {
        this.hideEditButton = false;
        this.hideSaveButton = true;
        this.hideCancelButton = true;
        this.disableInputs = true;
        if (!success) {
            this.passportDetails = Object.assign({}, this.origDetails);
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

    allowSave(model: Passport): boolean {
        let modifiedDetails = JSON.stringify(model);
        let orignalDetails = JSON.stringify(this.origDetails);
        return modifiedDetails === orignalDetails;
    }

    save(model: Passport):void {
        if (this.form.valid) {
            this.serverService.updatePassportDetails(model)
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
