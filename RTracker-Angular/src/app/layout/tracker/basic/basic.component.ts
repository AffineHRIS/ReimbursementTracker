import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Globals } from '../../../shared';

@Component({
    selector: 'basic-details',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})

export class BasicComponent implements OnInit {
    
    ReimbursementDetails : any;
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(){

    }

}
