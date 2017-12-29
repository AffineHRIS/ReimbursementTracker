import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { routerTransition } from '../../../../router.animations';
import { empExpReportsService } from '../../../../shared';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-diversityratio',
    templateUrl: './diversityratio.component.html',
    styleUrls: ['./diversityratio.component.scss'],
    animations: [routerTransition()]
})
export class DiversityRatioComponent implements OnInit {
     @ViewChild('container') chartContainer: any;

    public percent: number;
    public options: any;
    public Male : any;
    public MaleList : any;
    public FemaleList : any;
    public Female : any;
    public TotalCount: number;
    tableMaleHidden : boolean = false;
    tableFemaleHidden : boolean = true;
    From = "2015-01-02";
    To  = (new Date()).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');

    constructor(public el: ElementRef, private http:Http,private empExpReportsService: empExpReportsService) {
    }

    getDiversityRatio() {
        // check if model is valid
        this.empExpReportsService.getEmployeeDiversityRatio({From: this.From, To: this.To})
            .subscribe(
                (response) =>{
                    let body = response.json();
                    this.Male = body[0].data[0].length;
                    this.MaleList = body[0].data[0];
                    this.Female = body[0].data[1].length;
                    this.FemaleList = body[0].data[1];
                    this.TotalCount = this.Male + this.Female;

                    let chartConfig = {
                         chart: {
                             plotBackgroundColor: null as any,
                             plotBorderWidth: null as any,
                             plotShadow: false,
                             type: 'pie',

                         },
                         title: {
                             text: 'Diversity Ratio'
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
                             name: 'Gender',
                             colorByPoint: true,
                             data: [{
                                 name: 'Male',
                                 y: this.Male
                             }, {
                                 name: 'Female',
                                 y: this.Female
                             }],
                             point : {
                                 events : {
                                     click : (event) => {
                                         this.showTable(event.point.name);
                                      }
                                 }
                             }
                         }]
                     };

                     Highcharts.chart(this.chartContainer.nativeElement, chartConfig);
                },
                (error) => console.log(error)
            );
    }
    ngOnInit() {
        this.getDiversityRatio()
    }
    showTable(value:any) : void {
        if (value == "Male") {
              this.tableMaleHidden = false;
              this.tableFemaleHidden = true;
          }
          else {
              this.tableMaleHidden = true;
              this.tableFemaleHidden = false;
          }
    }
    filter() {
        this.getDiversityRatio()
    }
}
