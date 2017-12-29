import { Component, OnInit } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { empEduReportsService, EmpRepDetails } from '../../../../shared';
import { routerTransition } from '../../../../router.animations';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})

export class TablesComponent implements OnInit {
    empRepDetails : any;
    inputName : string = '';
    gradPassing : string = '';
    origDetails: any;
    filterTitle: string = 'Show Filters';
    hideFilterSection: boolean = true;

    constructor(private http:Http, private empEduReportsService: empEduReportsService) {
    }

    ngOnInit() {
         this.getEmployeeEduReports();
    }

    private extractData(res: Response) {
      const body = res.json();
      return body.data || {};
    }

    getEmployeeEduReports(): void {
        this.empEduReportsService.getEmployeeEduReports().then(empRepDetails => {
            this.empRepDetails = empRepDetails[0].data;
            this.origDetails = empRepDetails[0].data;
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
        // let filterCheckbox: string = this.gradPassing;
        let searchId: string = this.inputName.toLowerCase();
        // console.log(filterCheckbox);
        this.empRepDetails = [];
        this.empRepDetails = this.origDetails.filter(function(val, ind, arr){
            var status = (
                ( val.Employee_Id !== undefined && val.Employee_Id !== null && val.Employee_Id.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.Employee_Name!== undefined && val.Employee_Name !== null && val.Employee_Name.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.GRAD_Board !== null && val.GRAD_Board !== undefined && val.GRAD_Board.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.GRAD_Institute !== null && val.GRAD_Institute !== undefined && val.GRAD_Institute.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.GRAD_Marks !== null && val.GRAD_Marks !== undefined && val.GRAD_Marks.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.GRAD_Passing !== null && val.GRAD_Passing !== undefined && val.GRAD_Passing.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.HSC_Board !== null && val.HSC_Board !== undefined && val.HSC_Board.toLowerCase().indexOf(searchId) !== -1)||
                ( val.HSC_Institute !== null && val.HSC_Institute !== undefined && val.HSC_Institute.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.HSC_Marks !== null && val.HSC_Marks !== undefined && val.HSC_Marks.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.HSC_Passing !== null && val.HSC_Passing !== undefined && val.HSC_Passing.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.PG_Board !== null && val.PG_Board !== undefined && val.PG_Board.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.PG_Institute !== null && val.PG_Institute !== undefined && val.PG_Institute.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.PG_Marks !== null && val.PG_Marks !== undefined && val.PG_Marks.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.PG_Passing !== null && val.PG_Passing !== undefined && val.PG_Passing.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.SSC_Board !== null && val.SSC_Board !== undefined && val.SSC_Board.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.SSC_Institute !== null && val.SSC_Institute !== undefined && val.SSC_Institute.toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.SSC_Marks !== null && val.SSC_Marks !== undefined && val.SSC_Marks.toString().toLowerCase().indexOf(searchId) !== -1 ) ||
                ( val.SSC_Passing !== null && val.SSC_Passing !== undefined && val.SSC_Passing.toString().toLowerCase().indexOf(searchId) !== -1 )
            );
            return status;
        });
        // val.GRAD_Institute.toLowerCase().indexOf(searchId) != -1 || val.PG_Institute.toLowerCase().indexOf(searchId) != -1
    };
}
