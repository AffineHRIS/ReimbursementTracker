import { Component, OnInit } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { empExpReportsService } from '../../../../shared';
import { routerTransition } from '../../../../router.animations';

@Component({
    selector: 'app-experiennce',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    animations: [routerTransition()]
})
export class ExperienceComponent implements OnInit {

    ExperienceDetails : any;
    inputName : string = '';
    origDetails: any;
    filterTitle: string = 'Show Filters';
    hideFilterSection: boolean = true;

    constructor(private http:Http, private empExpReportsService: empExpReportsService) {
    }

    ngOnInit() {
       this.getEmployeeExpReports();
    }

    getEmployeeExpReports(): void {
        this.empExpReportsService.getEmployeeExpReports().then(ExperienceDetails => {
            this.ExperienceDetails = ExperienceDetails[0].data;
            this.origDetails = ExperienceDetails[0].data;
        });
    }

    toggleFilter(): void {
        this.hideFilterSection = !this.hideFilterSection;
        if ( this.hideFilterSection ) {
            this.filterTitle = 'Show Filters';
        } else {
            this.filterTitle = 'Hide Filters';
        }
    }

    searchValue(value: any): void {
        let searchId: string = this.inputName.toLowerCase();
        this.ExperienceDetails = [];
        this.ExperienceDetails = this.origDetails.filter(function(val, ind, arr){
            var status = (
                ( val.Employee_Id !== undefined && val.Employee_Id !== null && val.Employee_Id.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Employee_Name!== undefined && val.Employee_Name !== null && val.Employee_Name.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Affine_Exp !== null && val.Affine_Exp !== undefined && val.Affine_Exp.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Current_Designation !== null && val.Current_Designation !== undefined && val.Current_Designation.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Designation_Name !== null && val.Designation_Name !== undefined && val.Designation_Name.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Past_Exp !== null && val.Past_Exp !== undefined && val.Past_Exp.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Total_Exp !== null && val.Total_Exp !== undefined && val.Total_Exp.toString().toLowerCase().indexOf(searchId) !== -1)
            );
            return status;
        });
    }
}
