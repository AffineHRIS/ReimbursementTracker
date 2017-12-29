import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsService } from '../../../../shared';

@Component({
    selector: 'app-employeedetails',
    templateUrl: './employeedetails.component.html',
    styleUrls: ['./employeedetails.component.scss'],
    providers: []
})
export class EmployeeDetailsComponent implements OnInit {

    employeeDetails : [{}];
    fields : Array<string> = [];
    searchInput : string = '';
    hideColumnsList: boolean = true;
    hiddenColumnsList: Array<number> = [];
    hideColumnIndex: number = 1;
    inputName: any;

    constructor(
        private empDetService: EmployeeDetailsService
    ) {}

    ngOnInit() {
        this.empDetService.getEmployeeReportDetails().then(employeeReportDetails => {
            this.fields = employeeReportDetails.data[0];

            // Choose which fields to be displayed by default.
            for (let i = 6; i < this.fields.length; i++) {
                this.hiddenColumnsList.push( i );
            }

            if ( employeeReportDetails.data.length > 1 ) {
                this.employeeDetails = employeeReportDetails.data.slice(1);
            } else {
                console.log("No details found for the search criteria.")
            }

        });
    }

    generateArray(obj){
        return Object.keys(obj).map((key)=>{ return obj[key] });
    }

    toggleColumnsList(){
        this.hideColumnsList = !this.hideColumnsList;
    }

    toggleColumn( index, checked ) {
        if ( !checked ) {
            this.hiddenColumnsList.push( index );
        } else {
            let popIndex = this.hiddenColumnsList.indexOf( index );
            if ( popIndex !== -1 ) {
                this.hiddenColumnsList.splice( popIndex, 1 );
            }
        }
    }

    hideMyself( index ) {
        return this.hiddenColumnsList.indexOf( index ) !== -1;
    }

    searchValue(value: any): void {
        let searchStr: string = this.searchInput.toLowerCase();

    }

}
