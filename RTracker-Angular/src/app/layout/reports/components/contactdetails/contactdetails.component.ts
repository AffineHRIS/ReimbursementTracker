import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { routerTransition } from '../../../../router.animations';
import { empExpReportsService } from '../../../../shared';

@Component({
    selector: 'app-designationcount',
    templateUrl: './contactdetails.component.html',
    styleUrls: ['./contactdetails.component.scss'],
    animations: [routerTransition()]
})
export class ContactDetailsComponent implements OnInit {

    public contactDetails :any
    inputName : string = '';
    origDetails: any;
    constructor(public el: ElementRef, private http:Http,private empExpReportsService: empExpReportsService) {
    }

    getEmployeeExpReports(): void {
        this.empExpReportsService.getEmployeeContactDetails().then(contactDetails => {
            this.contactDetails = contactDetails[0].data;
            this.origDetails = contactDetails[0].data;
        });
     }

    ngOnInit() {
        this.getEmployeeExpReports();
    }

    searchValue(value: any): void {
        let searchId: string = this.inputName.toLowerCase();
        this.contactDetails = [];
        this.contactDetails = this.origDetails.filter(function(val, ind, arr){
          var status = (
              ( val.Employee_Id !== undefined && val.Employee_Id !== null && val.Employee_Id.toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Employee_Name!== undefined && val.Employee_Name !== null && val.Employee_Name.toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Blood_Group !== null && val.Blood_Group !== undefined && val.Blood_Group.toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Dob_Actual !== null && val.Dob_Actual !== undefined && val.Dob_Actual.toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Dob_Official !== null && val.Dob_Official !== undefined && val.Dob_Official.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Email_ID !== null && val.Email_ID !== undefined && val.Email_ID.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Email_id !== null && val.Email_id !== undefined && val.Email_id.toLowerCase().indexOf(searchId) !== -1)||
              ( val.Father_Name !== null && val.Father_Name !== undefined && val.Father_Name.toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Gender !== null && val.Gender !== undefined && val.Gender.toString().toLowerCase().indexOf(searchId) !== -1 )||
              ( val.Marital_Status !== null && val.Marital_Status !== undefined && val.Marital_Status.toString().toLowerCase().indexOf(searchId) !== -1 )||
              ( val.Mobile_No !== null && val.Mobile_No !== undefined && val.Mobile_No.toString().toLowerCase().indexOf(searchId) !== -1 )||
              ( val.Mother_Name !== null && val.Mother_Name !== undefined && val.Mother_Name.toString().toLowerCase().indexOf(searchId) !== -1 )||
              ( val.Spouse_Name !== null && val.Spouse_Name !== undefined && val.Spouse_Name.toString().toLowerCase().indexOf(searchId) !== -1 )||
              ( val.Residential_Address_1 !== null && val.Residential_Address_1 !== undefined && val.Residential_Address_1.toString().toLowerCase().indexOf(searchId) !== -1 )||
              ( val.Permanent_Address_1 !== null && val.Permanent_Address_1 !== undefined && val.Permanent_Address_1.toString().toLowerCase().indexOf(searchId) !== -1 )          );
          return status;
        });
    }
}
