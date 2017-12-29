import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeDetailsService, ServerService, CommonDataStreamService } from '../../../shared';
import { SkillDetail } from './skilldetail.model';
import { SkillsComponent } from './skills.component';

@Component({
    selector: 'skill-detail',
    templateUrl: './skill-detail.component.html',
    styleUrls: ['./skill-detail.component.scss'],
})
export class SkillDetailComponent implements OnInit {
    @Input() empId: any;

    skillDetailsForm: FormGroup;
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
        private reload : SkillsComponent,
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
        this.addSkill();
    }

    createForm() {
        this.skillDetailsForm = this.fb.group({
            empId: '',
            skillExps: this.fb.array([])
        });
    }

    get skillExps(): FormArray {
        return this.skillDetailsForm.get('skillExps') as FormArray;
    };


    addSkill() {
        this.skillExps.push(this.fb.group(new SkillDetail()));
    }

    removeSkill() {
        this.skillExps.removeAt( this.skillExps.length - 1 );
    }

    onSubmit() {

        if( this.skillDetailsForm.valid ) {
            console.log( this.skillDetailsForm.value );

            this.serverService.addEmployeeSkills( this.skillDetailsForm.value )
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
