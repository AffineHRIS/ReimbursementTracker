import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeDetailsService, ServerService, CommonDataStreamService } from '../../../shared';
import { Form } from './form.model';
import { FormTraining } from './form-training.model';
import { EducationComponent } from './education.component';

@Component({
    selector: 'form-training',
    templateUrl: './form-training.component.html',
    styleUrls: ['./form-training.component.scss'],
})
export class FormTrainingComponent implements OnInit {
    @Input() empId: any;

    formDetails: FormGroup;
    nameChangeLog: string[] = [];
    dataStream: any;

    levels = [
        'Beginner',
        'Intermediate',
        'Expert'
    ];

    years: number[] = [];
    months: number[] = [];

    constructor(
        private fb: FormBuilder,
        private serverService: ServerService,
        private cds: CommonDataStreamService,
        private reload : EducationComponent,
    ) {
        this.createForm();
        for ( let i = 0; i < 100; i++ ) {
            this.years.push(i);
        }
        for ( let i = 0; i < 12; i++ ) {
            this.months.push(i);
        }
    }

    ngOnInit(): void {
        this.dataStream = this.cds.dataStream;
        this.addForm();
    }

    createForm() {
        this.formDetails = this.fb.group({
            empId: '',
            formArray: this.fb.array([])
        });
    }

    get formArray(): FormArray {
        return this.formDetails.get('formArray') as FormArray;
    };


    addForm() {
        this.formArray.push(this.fb.group(new Form()));
    }

    removeForm() {
        this.formArray.removeAt( this.formArray.length - 1 );
    }

    onSubmit() {

        if( this.formDetails.valid ) {
            console.log( this.formDetails.value );

            this.serverService.addEmployeeSkills( this.formDetails.value )
            .subscribe(
                (response) =>{
                    let body = response.json();
                    alert(body.message);
                    this.reload.getDetails();
                },
                (error) => console.log(error)
            );

        }

    }

}
