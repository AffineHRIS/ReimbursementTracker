import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { reimbursementService, EmployeeIdNameService } from '../../../shared';
import { Globals } from '../../../shared';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';

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
    whenHold:boolean = true;
    submitButton :boolean = false;
    saveButton: boolean = true;
    employeeDetailRecord:any;
    searchInput : string = '';
    inputName : string = '';
    empList:any;
    origDetails: any;
    constructor(
        private route: ActivatedRoute,
        private reimbService: reimbursementService,
        private EmployeeDetail : EmployeeIdNameService
    ) { }

    @ViewChild('f') form: any;

    ngOnInit(): void {
        this.getEmployee();
        this.getClaims();
    }

    statusFind(value):void {
        if(value == "Accept") {
                this.whenAccept = false;
                this.whenHold = false;
        }
        else {
            this.whenAccept = false;
            this.whenHold = true;
        }
    }

    hideTab() : void {
        this.addReimbursementForm = true;
    }

    employeeDetail (employeeData : any) {
        this.EmployeeDetail.getEmployeeIdName(employeeData).then(employeeDetails => {
            this.employeeDetailRecord = employeeDetails[0].data;
            this.ReimbursementDetails.Employee_Name = "";
            this.ReimbursementDetails.Employee_Email = "";
             this.ReimbursementDetails.Employee_Name =this.employeeDetailRecord[0].Employee_Name;
             this.ReimbursementDetails.Employee_Email =this.employeeDetailRecord[0].Email_Id;
        });
    }

    getEmployee(): void {
        this.EmployeeDetail.getEmployeeList().then(empDetails => {
            this.empList = empDetails[0].data;
        });
     }

    addClaim() {
        this.addReimbursementForm = false;
    }

    searchValue(value: any): void {
        let searchId: string = this.inputName.toLowerCase();
        this.claimList = [];
        this.claimList = this.origDetails.filter(function(val, ind, arr){
          var status = (
              ( val.Employee_Id !== undefined && val.Employee_Id !== null && val.Employee_Id.toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Status !== null && val.Status !== undefined && val.Status.toString().toLowerCase().indexOf(searchId) !== -1 )          );
          return status;
        });
    }

    fileDownload(fileData:any) : void {

        const ws_name = 'SomeSheet';
        const wb: WorkBook = { SheetNames: [], Sheets: {} };
        const ws: any = utils.json_to_sheet(fileData);
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
        const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

        function s2ab(s) {
          const buf = new ArrayBuffer(s.length);
          const view = new Uint8Array(buf);
          for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
          };
          return buf;
        }

        saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'exported.xlsx');
        // console.log(fileData);
        // this.reimbService.getFileDownload(fileData).then(fileData => {
        //
        // });
    }

    // fileDownload(fileData:any) : void {
    //     console.log(fileData);
    //
    //     this.reimbService.getFileDownload(fileData)
    //     .subscribe(
    //         (response) =>{
    //             console.log("file downloaded");
    //         },
    //         (error) => {
    //             alert(error);
    //             console.log(error);
    //         }
    //     );
    // }


    getClaims(): void {
        this.reimbService.getClaimDetails().then(claimDetails => {
            this.claimList = claimDetails[0].data;
            this.origDetails = claimDetails[0].data;
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
             this.whenHold = true;
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
                  this.sendMail(body.data);
                  this.getClaims();
                  this.addReimbursementForm = true;
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
