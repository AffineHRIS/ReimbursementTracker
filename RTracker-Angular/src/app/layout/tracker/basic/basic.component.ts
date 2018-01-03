import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { reimbursementService, EmployeeIdNameService } from '../../../shared';
import { Globals } from '../../../shared';

@Component({
    selector: 'basic-details',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})


export class BasicComponent implements OnInit {

    ReimbursementDetails: any = [];

    claimList : any = [];
    claimValues : any =[];
    addReimbursementForm : boolean = true;
    whenAccept:boolean = true;
    whenReject:boolean = true;
    submitButton :boolean = false;
    saveButton: boolean = true;
    employeeDetailRecord:any;
    constructor(
        private route: ActivatedRoute,
        private reimbService: reimbursementService,
        private EmployeeDetail : EmployeeIdNameService
    ) { }

    @ViewChild('f') form: any;

    ngOnInit(): void {
        this.getClaims();
    }

    statusFind(value):void {
        if(value == "Accept") {
                this.whenAccept = false;
                this.whenReject = false;
        }
        else {
            this.whenAccept = false;
            this.whenReject = true;
        }
    }

    employeeDetail (employeeData : any) {
        this.EmployeeDetail.getEmployeeIdName(employeeData).then(employeeDetails => {
            this.employeeDetailRecord = employeeDetails[0].data;

             this.ReimbursementDetails.Employee_Name =this.employeeDetailRecord[0].Employee_Name;
             this.ReimbursementDetails.Employee_Email =this.employeeDetailRecord[0].Email_Id;
        });
    }

    addClaim() {
        this.addReimbursementForm = false;
    }

    getClaims(): void {
        this.reimbService.getClaimDetails().then(claimDetails => {
            this.claimList = claimDetails[0].data;
            if(claimDetails[0].data[0].Status == null) {
               claimDetails[0].data[0].Status = "Submitted"
            }
            console.log(this.claimList);
        });
     }


     sendMail(model:any): void {
         var modelData = Object.assign({}, model);
         this.EmployeeDetail.sendEmail(modelData).subscribe(
             (response) =>{
                 let body = response.json();
                 alert(body.message);
                 this.getClaims();

             },
             (error) => {
                 alert(error);
                 console.log(error);
             }
         );
      }


     showClaim(claimId) : void {
         this.reimbService.getClaim(claimId).then(claimvalues => {
             this.ReimbursementDetails = claimvalues[0];
             this.employeeDetail(this.ReimbursementDetails.Employee_Id);
             console.log(this.ReimbursementDetails);
             this.whenAccept = false;
             this.whenReject = true;
             this.submitButton = true;
             this.saveButton = false;
             this.addReimbursementForm = false;
         });
     }

    save(model : any) {
      console.log(model);

      if (this.form.valid) {

          var modelData = Object.assign({}, model);
          console.log( modelData );
          this.reimbService.addDetails(modelData)
          .subscribe(
              (response) =>{
                  let body = response.json();
                  alert(body.message);
                  this.getClaims();

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

        this.sendMail(model);
    }
}
