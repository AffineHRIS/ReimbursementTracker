import { Component, Input, OnInit,OnChanges, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { reimbursementService, EmployeeIdNameService } from '../../../shared';
import { Globals } from '../../../shared';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { CurrencyPipe } from '@angular/common';

import { DataTable, DataTableResource } from 'angular-4-data-table';

@Component({
    selector: 'basic-details',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})

export class BasicComponent implements OnInit {

    ReimbursementDetails: any = [];
    claimList : any = [];
    claimValues : any =[];
    multipleData :any = {};
    PaymentData : any = [];
    noClaims: boolean = true;
    addReimbursementForm : boolean = true;
    whenMultiple : boolean = false;
    whenAccept:boolean = true;
    whenComment:boolean = true;
    whenHold:boolean = true;
    whenPaid:boolean =true;
    submitButton :boolean = false;
    saveButton: boolean = true;
    employeeDetailRecord:any;
    searchInput : string = '';
    inputName : string = '';
    empList:any;
    origDetails: any;
    SuccessSave : string = '';
    SuccessMail : string = '';
    noEmpDetail: boolean = false;
    claims = this.claimList;
    claimResource = new DataTableResource(this.claims);
    claimCount = 0;
    caption : string = "Add Claims"
    value = true;
    SumOfApprovedAmount : string = "";
    data : any = {}
    From_Claims :any;
    To_Claims : any;
    Type : any;
    filterStatus : string = "";
    selectedItems : any = [];
    empSet : any = [];
    dropdownSettings = {};
    test :any;
    paidCondition : boolean = false;
    flag : boolean = false;
    alertCondition : boolean = true;
    public loading = false;
    @ViewChild(DataTable) claimsTable: DataTable;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private reimbService: reimbursementService,
        private EmployeeDetail : EmployeeIdNameService,

    ) {
        this.claimResource.count().then(count => this.claimCount = count);
    }
    @ViewChild('f') form: any;
    ngOnInit(): void {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m-1, 2);
        var lastDay = new Date();
        this.From_Claims = new Date(firstDay).toISOString().slice(0, 10);
        this.To_Claims = new Date(lastDay).toISOString().slice(0, 10);

        var data = {
            from :this.From_Claims,
            to: this.To_Claims,
            type:this.Type,
            emp_list : this.selectedItems,
        }

        this.getEmployee();
        this.getClaims(data);

        this.dropdownSettings = {
            text:"Select",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            badgeShowLimit: 3,
            disabled:false,
            searchPlaceholderText: "Search",
            enableCheckAll: true
        };
    }

    reloadClaims(params) {
        this.claimResource.query(params).then(claims => this.claims = claims);
    }

    allowEnterMail() {
      this.value= false;
    }

    statusFind(value):void {
        if(value == "Accept") {
            this.whenAccept = false;
            this.whenComment = false;
            this.whenHold = false;
            this.whenPaid = true;
        }
        else if(value == "Hold") {
            this.whenAccept = false;
            this.whenComment = false;
            this.whenHold = true;
            this.whenPaid = true;
        }
        else if(value == "Paid") {
            if(this.claimsTable.selectedRows.length > 0) {
                this.whenHold = true;
                this.whenPaid = false;
            }
            else {
                this.whenHold = false;
                this.whenPaid = false;
            }
        }
        else {
            this.whenAccept = false;
            this.whenComment = false;
            this.whenHold = true;
            this.whenPaid = false;
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
            if ( this.employeeDetailRecord !== undefined ) {
                var empId = employeeData;
                var resEmpId = empId.match(/inc/i);
                var symbol;

                if(resEmpId){
                    this.ReimbursementDetails.Amount_Type = "USD";
                }
                else {
                    this.ReimbursementDetails.Amount_Type = "INR";
                }
                this.value = true;
                this.ReimbursementDetails.Employee_Name = this.employeeDetailRecord[0].Employee_Name;
                this.ReimbursementDetails.Employee_Email = this.employeeDetailRecord[0].Email_Id;

            } else {
                this.value = false;
                var empId = employeeData;
                var resEmpId = empId.match(/inc/i);
                var symbol;

                if(resEmpId){
                    this.ReimbursementDetails.Amount_Type = "USD";
                }
                else {
                    this.ReimbursementDetails.Amount_Type = "INR";
                }
            }

        });
    }

    getEmployee(): void {
        this.EmployeeDetail.getEmployeeList().then(empDetails => {
            this.empList = empDetails[0].data;

            this.empList.forEach((val, index) => {
                this.empSet.push({ "id": val.Employee_Id, "itemName": val.Employee_Id, "deptId": val.Employee_Id });
            });
        });
    }

    approvedAmount() {
        var ApprovedAmount = [];
        this.flag = true;
        this.paidCondition = false;
        this.alertCondition = true;
        for(var i=0; i < this.claimsTable.selectedRows.length; i++) {
            this.paidCondition = true;
            ApprovedAmount.push(this.claimsTable.selectedRows[i].item.Approved_Amount)
            if(this.claimsTable.selectedRows[i].item.Status == 'Accept' && this.flag || this.claimsTable.selectedRows[i].item.Status == 'Paid' ) {
              this.paidCondition = true;
              this.alertCondition = true;
            }
            else {
                this.flag = false;
                this.paidCondition = false;
                this.alertCondition = false;
            }
        }
        var sum = ApprovedAmount.reduce((a, b) => a + b, 0)

        this.SumOfApprovedAmount = sum;
    }

    conditionTest() {
        this.paidCondition = true;
        this.alertCondition = true;
    }

    checkAmountType(type) {
        console.log(type)
        if(type == "indian") {
            console.log(type);
        }
    }

    addClaim() {
        var tempData = [];
        if(this.claimsTable.selectedRows.length >= 1 ) {
            this.form.reset();
            this.whenPaid = false;
            this.whenMultiple = true;
            this.whenAccept = false;
            this.whenComment = false;
            this.whenHold = true;
            this.addReimbursementForm = false;
        }
        else {
            this.SumOfApprovedAmount = "";
            this.whenMultiple = false;
            this.whenAccept = true;
            this.whenComment = true;
            this.whenHold = true;
            this.whenPaid = true;
            this.form.reset();
            this.addReimbursementForm = false;
        }
        for(var i=0; i < this.claimsTable.selectedRows.length; i++){
            tempData.push(this.claimsTable.selectedRows[i].item.Claim_Id);
        }
        this.ReimbursementDetails.Claim_Id = tempData;

    }

    onItemSelect(item:any){
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

    searchValue(value: any): void {
        let searchId: string = this.inputName.toLowerCase();
        this.claimList = [];
        this.claimList = this.origDetails.filter(function(val, ind, arr){
            var status = (
                ( val.Employee_Id !== undefined && val.Employee_Id !== null && val.Employee_Id.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Status !== null && val.Status !== undefined && val.Status.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Employee_Name !== undefined && val.Employee_Name !== null && val.Employee_Name.toLowerCase().indexOf(searchId) !== -1 ))
                return status;
            });

        if(this.claimList === null || this.claimList === undefined ) {
            this.filterStatus = "No Results Found";
        }
    }

    fileDownload(fileData:any) : void {
        var TableData = [];
        if(fileData.length){
            for(var i=0; i < this.claimsTable.selectedRows.length; i++){
                TableData.push(this.claimsTable.selectedRows[i].item)
            }
            const ws_name = 'SomeSheet';
            const wb: WorkBook = { SheetNames: [], Sheets: {} };
            const ws: any = utils.json_to_sheet(TableData);
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

            var s2ab = function(s) {
                const buf = new ArrayBuffer(s.length);
                const view = new Uint8Array(buf);
                for (let i = 0; i !== s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF;
                };
                return buf;
            }
            saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'claimsList.xlsx');
        }
        else {
            alert("Please select the claims id to download");
        }

    }

    formatEmployeeIds( dataList: any ): any {
        var formattedList = dataList;
        if ( dataList.length > 0 ) {
            formattedList = dataList.map(obj => {
                obj.Employee_Id = obj.Employee_Id.toUpperCase();
                return obj;
            });
        }
        return formattedList;
    }

    getClaims(model): void {
        this.loading = true;
        var modelData = Object.assign({}, model);
        this.reimbService.getClaimDetails(modelData).subscribe(
            (response) =>{
                let body = response.json();
                if ( body[0].data !== undefined ) {

                    body[0].data = this.formatEmployeeIds( body[0].data );

                    this.claimList = body[0].data;
                    this.origDetails = body[0].data;
                    this.filterStatus = body[0].msg;
                    if ( body[0].data[0].Status == null ) {
                        body[0].data[0].Status = "Submitted";
                    }
                    this.noClaims = this.claimList.length <= 0;
                    this.loading = false;
                }
            },
            (error) => {
                alert(error);
                console.log(error);
                this.loading = false;
            }
        );
    }

    filter() {
        var data = {
            from :this.From_Claims,
            to: this.To_Claims,
            type:this.Type,
            emp_list : this.selectedItems,
        }
        this.getClaims(data)
    }

    sendMail(model:any): void {
        var modelData = Object.assign({}, model);
        var data = {
            from :this.From_Claims,
            to: this.To_Claims,
            type:this.Type,
            emp_list : this.selectedItems,
        }
        this.EmployeeDetail.sendEmail(modelData).subscribe(
            (response) =>{
                let body = response.json();
                this.getClaims(data);
                this.SuccessMail = body.Status;
                setTimeout(()=>{    //<<<---    using ()=> syntax
                    this.SuccessMail = "";
                },1500);
            },
            (error) => {
                alert(error);
                console.log(error);
            }
        );
    }

    showClaim(claimId) : void {
         if(this.claimsTable.selectedRows.length >=1) {
             alert("Please uncheck selected claims and than claim id");
         }
         else {
             this.SumOfApprovedAmount = "";
             this.whenMultiple = false;
             this.whenAccept = true;
             this.whenComment = true;
             this.whenHold = true;
             this.whenPaid = true;
             this.form.reset();
             this.addReimbursementForm = false;
             this.reimbService.getClaim(claimId.Claim_Id).then(claimvalues => {
                 this.ReimbursementDetails = claimvalues[0];
                 this.employeeDetail(this.ReimbursementDetails.Employee_Id);

                 this.ReimbursementDetails.Claim_Id = claimId.Claim_Id;
                 console.log(claimId);
                 console.log("checkkkk");

                 this.submitButton = true;
                 this.saveButton = false;
                 this.addReimbursementForm = false;
                 if(this.claimsTable.selectedRows.length >= 1){
                     alert("Un check the selected Claims");
                 }
                 else {
                     if(this.ReimbursementDetails.Status == "Accept") {
                         this.whenAccept = false;
                         this.whenComment = false;
                         this.whenHold = false;
                         this.whenPaid = true;
                     }
                     else if(this.ReimbursementDetails.Status == "Hold") {
                         this.whenAccept = false;
                         this.whenComment = false;
                         this.whenHold = true;
                         this.whenPaid = true;
                     }
                     else if(this.ReimbursementDetails.Status == "Paid") {
                         this.whenAccept = false;
                         this.whenComment = false;
                         this.whenHold = false;
                         this.whenPaid = false;
                     }
                     else {
                         this.whenAccept = false;
                         this.whenComment = false;
                         this.whenHold = true;
                         this.whenPaid = true;
                     }
                 }
             });
         }
    }

    save(model : any) {
        model["Claim_Id"] = this.ReimbursementDetails.Claim_Id;

        var modelData = Object.assign({}, model);
        var TableData = [];

      //  modelData.Employee_Id = modelData.Employee_Id.toUpperCase();
        console.log("modelData:");
        console.log(modelData);
        this.multipleData.PaymentData = modelData;
        for(var i=0; i < this.claimsTable.selectedRows.length; i++){
            TableData.push(this.claimsTable.selectedRows[i].item)
        }
        this.multipleData.selectedRow = TableData;
        console.log( this.multipleData );

        var data = {
            from :this.From_Claims,
            to: this.To_Claims,
            type:this.Type,
            emp_list : this.selectedItems,
        }

        if (this.form.valid) {
            var modelData = Object.assign({}, model);
            this.reimbService.addDetails(this.multipleData)
            .subscribe(
                (response) =>{
                    let body = response.json();
                    if(this.multipleData.PaymentData.Status == null ) {
                        if(this.multipleData.PaymentData.Employee_Email!=null) {
                            this.sendMail(body.data);
                        }
                    }
                    this.SuccessSave = body.message;
                    this.getClaims(data);
                    setTimeout(()=> {    //<<<---    using ()=> syntax
                        this.SuccessSave = "";
                    },4000);
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
    refresh(selectedItems:any): void {
        //this.OnItemDeSelect(selectedItems)
        //this.router.navigate(['/basic']);
        //location.reload(true);
        window.open("/ReimbursementTracker","_self")
    }
}
