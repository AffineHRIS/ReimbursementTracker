import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Filter } from './filter.model';
import { ServerService } from '../../../../shared';
import { TablesComponent } from './tables.component';


@Component({
    selector: 'filters',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

    filterValue: FormGroup;
    nameChangeLog: string[] = [];
    numberValueHidden : boolean = true;
    stringValueHidden : boolean = true;
    filterConditionsValue : boolean = true;
    constructor(
        private fb: FormBuilder,
        private serverService: ServerService,
        private tc: TablesComponent
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.addFilter();
    }

    createForm() {
        this.filterValue = this.fb.group({
            filterValues: this.fb.array([])
        });
    }

    onChangeOperand(value) {
        if ( value == 'GRAD_Institute' || value == 'PG_Institute') {
            this.numberValueHidden = true;
            this.stringValueHidden = false;
        }
        else {
            this.stringValueHidden = true;
            this.numberValueHidden = false;
        }

    }
    get filterValues(): FormArray {
        return this.filterValue.get('filterValues') as FormArray;
    };


    addFilter() {
        this.filterValues.push(this.fb.group(new Filter()));
        if (this.filterValues.length > 1) {
            this.filterConditionsValue = false;
        }
        else {
            this.filterConditionsValue = true;
        }
    }

    removeFilter() {
        this.filterValues.removeAt( this.filterValues.length - 1 );
    }

    onSubmit() {

        console.log( this.filterValue.value );
        this.serverService.filterEducation( this.filterValue.value )
        .subscribe(
            (response) =>{
                let body = response.json();
                console.log(body);
                // this.tc.empRepDetails = [];
                this.tc.empRepDetails = body[0].data;
            },
            (error) => console.log(error)
        );
    }

}
