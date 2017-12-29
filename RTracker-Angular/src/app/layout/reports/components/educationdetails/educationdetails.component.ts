import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { educationalDetailsReportsService } from '../../../../shared';
import { routerTransition } from '../../../../router.animations';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-personal',
    templateUrl: './educationdetails.component.html',
    styleUrls: ['./educationdetails.component.scss'],
    animations: [routerTransition()]
})
export class EducationalDetailsComponent implements OnInit {

    @ViewChild('container') chartContainer: any;
    EducationalDetails : any;
    NonEngineering = '';
    Engineering  = '';
    Total = '';
    NonEnggDetails : any;
    origDetailNonEngg : any;
    inputName : string = '';
    origDetails: any;
    tableEnggHidden : boolean = false;
    tableNonEnggHidden : boolean = true;

    constructor(public el: ElementRef, private http:Http, private educationalDetailsReportsService: educationalDetailsReportsService) {
    }

    ngOnInit() {
       this.getEducationalDetailsReports();
    }



    getEducationalDetailsReports(): void {

        this.educationalDetailsReportsService.getEducationalDetailsReports().then(EducationalDetails => {
            this.EducationalDetails = EducationalDetails[0].data[0];
            this.origDetails = EducationalDetails[0].data[0];
            this.NonEnggDetails = EducationalDetails[0].data[1]
            this.origDetailNonEngg = EducationalDetails[0].data[1];

            this.Engineering = EducationalDetails[0].data[0].length;
            this.NonEngineering = EducationalDetails[0].data[1].length;
            this.Total = this.Engineering + this.NonEngineering;
            let chartConfig = {
             chart: {
             plotBackgroundColor: null as any,
             plotBorderWidth: null as any,
             plotShadow: false,
             type: 'pie',

             },
             title: {
             text: 'Engineers vs. Others'
             },
             tooltip: {
             pointFormat: '{series.name}: <b>{point.y}</b>'
             },
             plotOptions: {
             pie: {
               allowPointSelect: true,
               cursor: 'pointer',
               dataLabels: {
                   enabled: true,
                   format: '<b>{point.name}</b>: {point.y}',
                   style: {
                       //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                   }
               }
             }
             },
             series: [{
                 name: 'Education Details',
                 colorByPoint: true,
                 data: [{
                   name: 'Engineers',
                   y: this.Engineering
                 }, {
                   name: 'Others',
                   y: this.NonEngineering
               }],
               point:{
                  events:{
                      click : (event) => {
                          this.showTable(event.point.name);
                       }
                  }
              }
             }],
         };
             Highcharts.chart(this.chartContainer.nativeElement, chartConfig);
        });
    }

    showTable(value:any) : void{
        if (value == "Engineers") {
            this.tableEnggHidden = false;
            this.tableNonEnggHidden = true;
        }
        else {
            this.tableEnggHidden = true;
            this.tableNonEnggHidden = false;
        }

    }

    searchValue(value: any): void {
        let searchId: string = this.inputName.toLowerCase();
        this.EducationalDetails = [];
        this.NonEnggDetails = [];
        this.EducationalDetails = this.origDetails.filter(function(val, ind, arr){
          var status = (
              ( val.Employee_Id !== undefined && val.Employee_Id !== null && val.Employee_Id.toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Employee_Name!== undefined && val.Employee_Name !== null && val.Employee_Name.toLowerCase().indexOf(searchId) !== -1 )
          );
          return status;
        });

        this.NonEnggDetails = this.origDetailNonEngg.filter(function(val, ind, arr){
          var status = (
              ( val.Employee_Id !== undefined && val.Employee_Id !== null && val.Employee_Id.toLowerCase().indexOf(searchId) !== -1 ) ||
              ( val.Employee_Name!== undefined && val.Employee_Name !== null && val.Employee_Name.toLowerCase().indexOf(searchId) !== -1 )
          );
          return status;
        });
    }
}
