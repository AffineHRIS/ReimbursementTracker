import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Globals } from '../../../shared';

@Component({
    selector: 'basic-details',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})


export class BasicComponent implements OnInit {

    ReimbursementDetails: any = {};
    addReimbursementForm : boolean = true;

    constructor(
        private route: ActivatedRoute
    ) { }

    @ViewChild('f') form: any;

    ngOnInit(): void {

    }

    addClaim() {
        this.addReimbursementForm = false;
    }
    save(model : any) {
      console.log(model);
    }
}
