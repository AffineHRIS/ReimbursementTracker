import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsService, ServerService, CommonDataStreamService } from '../../../../shared';
import { WorkExperience } from './workexperience.model';

@Component({
    selector: 'past-work-experience',
    templateUrl: './past-work-experience.component.html',
    styleUrls: ['./past-work-experience.component.scss'],
})
export class PastWorkExperienceComponent implements OnInit {
    @Input() empId: any;

    pastExpForm: FormGroup;
    nameChangeLog: string[] = [];

    dataStream: any;

    constructor(
        private fb: FormBuilder,
        private serverService: ServerService,
        private cds: CommonDataStreamService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.dataStream = this.cds.dataStream;
        this.addWorkExperience();
    }

    createForm() {
        this.pastExpForm = this.fb.group({
            empId: '',
            pastWorkExps: this.fb.array([])
        });
    }

    get pastWorkExps(): FormArray {
        return this.pastExpForm.get('pastWorkExps') as FormArray;
    };


    addWorkExperience() {
        this.pastWorkExps.push(this.fb.group(new WorkExperience()));
    }

    removeWorkExperience() {
        this.pastWorkExps.removeAt( this.pastWorkExps.length - 1 );
    }

    onSubmit() {

        console.log( this.pastExpForm.value );

        this.serverService.addEmployeeExperience( this.pastExpForm.value )
        .subscribe(
            (response) =>{
                let body = response.json();
                alert(body.message);
            },
            (error) => console.log(error)
        );

    }

}
