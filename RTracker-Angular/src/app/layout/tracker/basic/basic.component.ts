import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FileUploader } from 'ng2-file-upload';

import { EmployeeDetailsService, EmployeeDetails, ServerService, Globals } from '../../../shared';
import { Basic } from './basic.interface';

@Component({
    selector: 'basic-details',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})

export class BasicComponent implements OnInit {

    employeeid: string;
    action: string = 'updation';
    ReimbursementDetails : any;
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(){

        this.route.params.subscribe(params => {
           this.employeeid = params['id'];
           if ( this.employeeid === undefined ) {
               this.employeeid = sessionStorage.getItem('username');
           }
        });

    }

}
