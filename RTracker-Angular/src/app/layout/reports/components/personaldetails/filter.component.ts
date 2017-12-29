import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Filter } from './filter.model';
import { ServerService } from '../../../../shared';
 import { PersonalDetailsComponent } from './personaldetails.component';

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
    hiddenTextField : boolean = false;
    hiddenDateField : boolean = true;
    constructor(
        private fb: FormBuilder,
        private serverService: ServerService,
        private personal : PersonalDetailsComponent
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.addFilter();
    }

    onChangeOperand(value) {
          if ( value == 'Gender' ) {
            //  this.hiddenFormSelect = false;
              //this.hiddenFormInput = true;
              this.numberValueHidden = true;
              this.stringValueHidden = false;
              this.hiddenTextField = false;
              this.hiddenDateField = true;
          }
          else {
              this.stringValueHidden = true;
              this.numberValueHidden = false;
              this.hiddenDateField = false;
              this.hiddenTextField = true;
              //this.hiddenFormSelect = true;
            //  this.hiddenFormInput = false;
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

        this.serverService.filterPersonalDetails( this.filterValue.value )
        .subscribe(
            (response) =>{
                let body = response.json();
                console.log(body);
                  this.personal.PersonalDetails = body[0].data;
            },
            (error) => console.log(error)
        );
    }

}
