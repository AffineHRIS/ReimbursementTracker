import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Filter } from './filter.model';
import { ServerService } from '../../../../shared';
import { ExperienceComponent } from './experience.component';

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
    hiddenFormSelect : boolean = true;
    hiddenFormInput : boolean = false;
    constructor(
        private fb: FormBuilder,
        private serverService: ServerService,
        private experience : ExperienceComponent
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.addFilter();
    }

    onChangeOperand(value) {
        if ( value == 'Current_Designation' ) {
            this.hiddenFormSelect = false;
            this.hiddenFormInput = true;
            this.numberValueHidden = true;
            this.stringValueHidden = false;
        }
        else {
            this.stringValueHidden = true;
            this.numberValueHidden = false;
            this.hiddenFormSelect = true;
            this.hiddenFormInput = false;
        }

    }

    createForm() {
        this.filterValue = this.fb.group({
            filterValues: this.fb.array([])
        });
    }

    get filterValues(): FormArray {
        return this.filterValue.get('filterValues') as FormArray;
    };


    addFilter() {
        this.filterValues.push(this.fb.group(new Filter()));
    }

    removeFilter() {
        this.filterValues.removeAt( this.filterValues.length - 1 );
    }

    onSubmit() {
        console.log( this.filterValue.value );

        this.serverService.filterExperience( this.filterValue.value )
        .subscribe(
            (response) =>{
                let body = response.json();
                console.log(body);
                 this.experience.ExperienceDetails = body[0].data;
            },
            (error) => console.log(error)
        );
    }

}
