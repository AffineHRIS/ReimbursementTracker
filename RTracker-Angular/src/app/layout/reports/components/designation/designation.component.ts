import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { routerTransition } from '../../../../router.animations';
import * as Highcharts from 'highcharts';
import { empExpReportsService } from '../../../../shared';
import { Filter} from "./designation.interface";
@Component({
    selector: 'app-designationcount',
    templateUrl: './designation.component.html',
    styleUrls: ['./designation.component.scss'],
    animations: [routerTransition()]
})
export class DesignationCountComponent implements OnInit {
     @ViewChild('DesignationCount') chartContainer: any;
     @ViewChild('sourceOfHire') sourceOfHireContainer: any;
    public percent: number;
    public options: any;
    public designationCountDetails :any;
    public TotalCount: number;
    public BA: number;
    public SBA: number;
    public CONSULTANT: number;
    public MANAGER: number;
    public SE: number;
    public SSE: number;
    public TL: number;
    public Senior_Manager: number;
    public Portal : any;
    public Reference : any;
    public Vendor : any;
    public FilterData:any;
    public BAList: number;
    public SBAList: number;
    public consultantList: number;
    public managerList: number;
    public SEList: number;
    public SSEList: number;
    public TLList: number;
    public Senior_ManagerList: number;

    tableBAHidden : boolean = false;
    tableSBAHidden : boolean = true;
    tableSEHidden : boolean = true;
    tableSSEHidden : boolean = true;
    tableConsultantHidden : boolean = true;
    tableManagerHidden : boolean = true;
    tableTLHidden : boolean = true;
    tableSenior_ManagerHidden : boolean = true;

    From = "2015-01-02";
    To  = (new Date()).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');

    constructor(public el: ElementRef, private http:Http,private empExpReportsService: empExpReportsService) {
    }

    getSourceOfHire() {
        // check if model is valid
        this.empExpReportsService.getEmployeeSourceOfHire({From: this.From, To: this.To})
            .subscribe(
                (response) =>{
                    let body = response.json();
                    this.Portal = body[0].data[0].Portal;
                    this.Reference = body[0].data[0].Reference;
                    this.Vendor = body[0].data[0].Vendor;
                    this.TotalCount = this.Portal + this.Reference + this.Vendor;

                    let chartConfig = {
                         chart: {
                             plotBackgroundColor: null as any,
                             plotBorderWidth: null as any,
                             plotShadow: false,
                             type: 'pie',
                         },
                         title: {
                             text: ' Source of Hire -'+this.TotalCount
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
                             colorByPoint: true,
                             data: [{
                                 name: 'Portal',
                                 y: this.Portal
                             }, {
                                 name: 'Reference',
                                 y: this.Reference ,
                             },{
                                 name: 'Vendor',
                                 y: this.Vendor
                             }],
                             point:{
                                events:{
                                    click: function (event) {
                                        alert("Success");
                                    }
                                }
                            }
                         }]
                     };

                     Highcharts.chart(this.sourceOfHireContainer.nativeElement, chartConfig);
                },
                (error) => console.log(error)
            );
    }
    getEmployeeExpReports() {
        // check if model is valid
        this.empExpReportsService.getEmployeeDesignationCount({From: this.From, To: this.To})
            .subscribe(
                (response) =>{
                    let body = response.json();
                    this.BA = body[0].data[0].length;
                    this.BAList = body[0].data[0];

                    this.SBA = body[0].data[1].length;
                    this.SBAList = body[0].data[1];

                    this.CONSULTANT = body[0].data[5].length;
                    this.consultantList = body[0].data[5];

                    this.MANAGER = body[0].data[6].length;
                    this.managerList = body[0].data[6];

                    this.SE = body[0].data[2].length;
                    this.SEList = body[0].data[2];

                    this.SSE = body[0].data[3].length;
                    this.SSEList = body[0].data[3];

                    this.TL = body[0].data[4].length;
                    this.TLList = body[0].data[4];

                    this.Senior_Manager = body[0].data[7].length;
                    this.Senior_ManagerList = body[0].data[7];

                    this.TotalCount = this.BA + this.SBA + this.CONSULTANT + this.MANAGER + this.MANAGER + this.SE + this.SSE + this.TL + this.Senior_Manager;

                    let chartConfig = {
                         chart: {
                             plotBackgroundColor: null as any,
                             plotBorderWidth: null as any,
                             plotShadow: false,
                             type: 'pie',
                         },
                         title: {
                             text: 'Designations vs. Count'
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
                             colorByPoint: true,
                             data: [{
                                 name: 'BA',
                                 y: this.BA
                             }, {
                                 name: 'SBA',
                                 y: this.SBA ,
                             },{
                                 name: 'Consultant',
                                 y: this.CONSULTANT
                             }, {
                                 name: 'Manager',
                                 y: this.MANAGER,
                             }, {
                                 name: 'Software Engineer',
                                 y: this.SE,
                             }, {
                                 name: 'Senior Software Engineer',
                                 y: this.SSE,
                             }, {
                                 name: 'Technology Lead',
                                 y: this.TL,
                             }, {
                                 name: 'Senior Manager',
                                 y: this.Senior_Manager,
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
        this.getEmployeeExpReports();
        this.getSourceOfHire();
    }

    showTable(value:any) : void {
        if (value == "BA") {
              this.tableBAHidden = false;
              this.tableSBAHidden = true;
              this.tableSEHidden = true;
              this.tableSSEHidden = true;
              this.tableConsultantHidden = true;
              this.tableManagerHidden = true;
              this.tableTLHidden = true;
              this.tableSenior_ManagerHidden = true;
          }
          else if (value == "SBA"){
              this.tableBAHidden = true;
              this.tableSBAHidden = false;
              this.tableSEHidden = true;
              this.tableSSEHidden = true;
              this.tableConsultantHidden = true;
              this.tableManagerHidden = true;
              this.tableTLHidden = true;
              this.tableSenior_ManagerHidden = true;
          }
          else if (value == "Software Engineer"){
              this.tableBAHidden = true;
              this.tableSBAHidden = true;
              this.tableSEHidden = false;
              this.tableSSEHidden = true;
              this.tableConsultantHidden = true;
              this.tableManagerHidden = true;
              this.tableTLHidden = true;
              this.tableSenior_ManagerHidden = true;
          }
          else if (value == "Senior Software Engineer"){
              this.tableBAHidden = true;
              this.tableSBAHidden = true;
              this.tableSEHidden = true;
              this.tableSSEHidden = false;
              this.tableConsultantHidden = true;
              this.tableManagerHidden = true;
              this.tableTLHidden = true;
              this.tableSenior_ManagerHidden = true;
          }
          else if (value == "Consultant"){
              this.tableBAHidden = true;
              this.tableSBAHidden = true;
              this.tableSEHidden = true;
              this.tableSSEHidden = true;
              this.tableConsultantHidden = false;
              this.tableManagerHidden = true;
              this.tableTLHidden = true;
              this.tableSenior_ManagerHidden = true;
          }
          else if (value == "Manager"){
              this.tableBAHidden = true;
              this.tableSBAHidden = true;
              this.tableSEHidden = true;
              this.tableSSEHidden = true;
              this.tableConsultantHidden = true;
              this.tableManagerHidden = false;
              this.tableTLHidden = true;
              this.tableSenior_ManagerHidden = true;
          }
          else if (value == "Technology Lead"){
              this.tableBAHidden = true;
              this.tableSBAHidden = true;
              this.tableSEHidden = true;
              this.tableSSEHidden = true;
              this.tableConsultantHidden = true;
              this.tableManagerHidden = true;
              this.tableTLHidden = false;
              this.tableSenior_ManagerHidden = true;
          }
          else if (value == "Senior Manager"){
              this.tableBAHidden = true;
              this.tableSBAHidden = true;
              this.tableSEHidden = true;
              this.tableSSEHidden = true;
              this.tableConsultantHidden = true;
              this.tableManagerHidden = true;
              this.tableTLHidden = true;
              this.tableSenior_ManagerHidden = false;
          }
    }
    filter() {
        this.getEmployeeExpReports();
        this.getSourceOfHire();
    }
}
