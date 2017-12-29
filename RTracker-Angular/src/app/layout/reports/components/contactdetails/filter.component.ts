import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Filter } from './filter.model';
import { ServerService } from '../../../../shared';
import { ContactDetailsComponent } from './contactdetails.component';
@Component({
    selector: 'filters',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

    filterValue: FormGroup;
    nameChangeLog: string[] = [];

    constructor(
        private fb: FormBuilder,
        private serverService: ServerService,
        private contact : ContactDetailsComponent
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

        this.serverService.filterContactdetails( this.filterValue.value )
        .subscribe(
            (response) =>{
                let body = response.json();
                console.log(body);
                 this.contact.contactDetails = body[0].data;

            },
            (error) => console.log(error)
        );
    }

}
