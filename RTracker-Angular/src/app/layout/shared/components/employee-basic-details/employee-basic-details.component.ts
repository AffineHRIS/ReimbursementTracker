import { Component, OnChanges, SimpleChanges, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FileUploader } from 'ng2-file-upload';
import {
    EmployeeDetailsService,
    EmployeeDetails,
    ServerService,
    CommonDataStreamService,
    Globals
} from '../../../../shared';

@Component({
    selector: 'app-employee-basic-details',
    templateUrl: './employee-basic-details.component.html',
    styleUrls: ['./employee-basic-details.component.scss']
})
export class EmployeeBasicDetailsComponent implements OnChanges {

    @Input() action: string;
    @Input() empid: string;

    newEmpAddition: boolean = false;

    employeeid: string;
    hideEditButton: boolean = false;
    hideSaveButton: boolean = true;
    hideCancelButton: boolean = true;
    disableSaveButton : boolean = true;
    disableInputs: boolean = true;
    origDetails: any = {};
    basicDetails: any = {};
    dataStream: any;
    srcPath: any;
    actionPath: string = '';
    Country_1 = "98"; Country_2 = "98";
    State_1 = ""; State_2 = "";
    dropdownSettings = {
        singleSelection: false,
        text:"",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        badgeShowLimit: 3,
        disabled:true,
        searchPlaceholderText: "Search",
        enableCheckAll: true
    };
    teamsList = [];
    selectedTeams = [];
    langsList = [];
    selectedLangs = [];
    referenceName:boolean = true;
    portalName:boolean = true;
    vendorName:boolean = true;
    cities1: any;
    cities2: any;
    today: any;

    @ViewChild('f') form: any;

    constructor(
        private empDetService: EmployeeDetailsService,
        private router: Router,
        private route: ActivatedRoute,
        private serverService: ServerService,
        private commonDataStreamService : CommonDataStreamService,
        private globals: Globals
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        // console.log( "ngOnChanges: e-b-d.c" );
        // console.log( this.empid );
        // console.log( this.action );

        this.newEmpAddition = ( this.action === 'addition' );

        if ( !this.newEmpAddition ) {

            this.employeeid = this.empid;

            if ( this.employeeid === undefined ) {
                this.employeeid = sessionStorage.getItem('username');
            }

            this.getDetails();

        } else if ( this.newEmpAddition ) {

            this.newEmpAdditionSettings();

        }

        this.dataStream = this.commonDataStreamService.dataStream;
        this.dataStream.languages.forEach(val => {
            this.langsList.push({ "id": val.Map_Language_Id, "itemName": val.Map_Language_Name });
        });
        this.dataStream.projects.forEach((val, index) => {
            this.teamsList.push({ "id": val.Project_Id, "itemName": val.Project_Name, "deptId": val.Department_Id });
        });

    }

    newEmpAdditionSettings() : void {
        this.disableInputs = false;
        this.hideEditButton = true;
        this.hideSaveButton = false;
        this.hideCancelButton = true;
        this.basicDetails = {
            Country_1: "98",
            Country_2: "98"
        }
        this.dropdownSettings = {
            singleSelection: false,
            text:"",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            badgeShowLimit: 3,
            disabled:false,
            searchPlaceholderText: "Search",
            enableCheckAll: true
        };
    }

    getDetails(): any {
        this.empDetService.getBasicDetails(this.employeeid).then(result => {
            this.basicDetails = Object.assign({}, result.data[0]);
            this.origDetails = Object.assign({}, this.basicDetails);

            this.basicDetails.teams.forEach((val, index) => {
                this.selectedTeams.push({ "id": parseInt(val.Team_Id), "itemName": val.Team_Name, "deptId": val.Department_Id });
            });

            this.basicDetails.languages.forEach(val => {
                this.selectedLangs.push({ "id": val.Language_Id, "itemName": val.Language_Name });
            });

            this.srcPath = 'http://'+ this.globals.apiServerIP +':3100/static/' + this.basicDetails.Photograph;
            this.actionPath = 'http://'+ this.globals.apiServerIP +':3100/api/Upload/'+ this.basicDetails.Employee_Id;

            if ( this.basicDetails.State_1 !== undefined ) {
                this.loadCities(this.basicDetails.State_1, 'cities1');
            }
            if ( this.basicDetails.State_2 !== undefined ) {
                this.loadCities(this.basicDetails.State_2, 'cities2');
            }

            this.sourceHire( this.basicDetails.Source_of_Hire );

        });
    }

    allowSave(model: any): boolean {
        let modifiedDetails = JSON.stringify(model);
        let orignalDetails = JSON.stringify(this.origDetails);
        return modifiedDetails === orignalDetails;
    }

    cancelEdit(success: boolean = false): boolean {
        this.hideEditButton = false;
        this.hideSaveButton = true;
        this.hideCancelButton = true;
        this.disableInputs = true;

        this.hideIframe = true;

        if (!success) {
            this.basicDetails = Object.assign({}, this.origDetails);
        }

        this.dropdownSettings = {
            singleSelection: false,
            text:"",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            badgeShowLimit: 3,
            disabled:true,
            searchPlaceholderText: "Search",
            enableCheckAll: true
        };
        return false;
    }

    enableEdit(): boolean {
        this.hideEditButton = true;
        this.hideSaveButton = false;
        this.hideCancelButton = false;
        this.disableInputs = false;

        this.dropdownSettings = {
            singleSelection: false,
            text:"",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            badgeShowLimit: 3,
            disabled:false,
            searchPlaceholderText: "Search",
            enableCheckAll: true
        };

        return false;
    }

    sourceHire(value) : void {
        if ( value == "Reference" ) {
            this.referenceName = false;
            this.portalName = true;
            this.vendorName = true;
        }
        else if ( value == "Portal" ) {
            this.referenceName = true;
            this.portalName = false;
            this.vendorName = true;
        }
        else if ( value == "Vendor" ) {
            this.referenceName = true;
            this.portalName = true;
            this.vendorName = false;
        }
    }

    loadCities(stateId, listName): void {
        this[listName] = [];
        this[listName] = this.dataStream.cities.filter(
            function(obj){
                return obj.Map_State_Id == stateId;
            }
        )
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
    hideIframe = true;
    updateImageStatus(){
        this.hideIframe = false;
    }
    // Image upload preview

    save(model: any):void {
        // check if model is valid
        // if valid, call API to save customer
        if (this.form.valid) {
            var empId = this.newEmpAddition ? ( model.Employee_No_Series + model.Employee_Number ) : model.Employee_Id;

            var modelData = {
                Employee_Id: empId,
                Employee_Name: model.Employee_Name,
                Design_At_Joining: model.Design_At_Joining ,
                Joining_Date: model.Joining_Date ,
                Dob_Official: model.Dob_Official ,
                Dob_Actual: model.Dob_Actual ,
                Gender: model.Gender ,
                Blood_Group: model.Blood_Group ,
                Contact_No: model.Contact_No ,
                PAN: model.PAN ,
                UAN_ID: model.UAN_ID ,
                Aadhar_No: model.Aadhar_No ,
                Nationality: model.Nationality ,
                Address_Line_1_1: model.Address_Line_1_1 ,
                Address_Line_2_1: model.Address_Line_2_1 ,
                City_1: model.City_1 ,
                State_1: model.State_1 ,
                Country_1: model.Country_1 ,
                Zip_Code_1: model.Zip_Code_1 ,
                Email_ID: model.Email_ID ,
                Skype_ID: model.Skype_ID ,
                Mobile_No: model.Contact_No ,
                Alternate_Contact_No: model.Alt_Contact_No ,
                Emergency_Contact_Relation: model.Emergency_Contact_Relation ,
                Emergency_Contact_Name: model.Emergency_Contact_Name ,
                Emergency_Contact_No: model.Emergency_Contact_No ,
                Address_Line_1_2: model.Address_Line_1_2 ,
                Address_Line_2_2: model.Address_Line_2_2 ,
                City_2: model.City_2 ,
                State_2: model.State_2 ,
                Country_2: model.Country_2 ,
                Zip_Code_2: model.Zip_Code_2,
                Teams: model.Team,
                Languages: model.Lang_Known,
                Skills: model.Skill_Sets,
                Religion: model.Religion,
                Reporting_Manager: model.Reporting_Manager,
                Probation_Period: model.Probation_Period,
                Work_Location: model.Work_Location,
                Source_of_Hire: model.Source_of_Hire,
                CTC: model.CTC,
                Source_Of_Hire_Name: model.Source_Of_Hire_Name,
                HR_SPOC: model.HR_SPOC
            }

            if ( this.newEmpAddition ) {

                this.serverService.addEmployee(modelData)
                .subscribe(
                    (response) => {
                        let body = response.json();
                        this.commonDataStreamService.fetchBasicDetails();
                        this.router.navigate(['/basic', empId]);
                        alert(body.message);
                    },
                    (error) => console.log(error)
                );

            } else if ( !this.newEmpAddition ) {

                this.serverService.updateEmployeeDetails(modelData)
                .subscribe(
                    (response) => {
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

        } else {
            alert("Required fields are manadatory")
        }

    }

}
