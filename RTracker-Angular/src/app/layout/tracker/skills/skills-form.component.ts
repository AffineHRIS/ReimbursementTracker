import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ServerService, CommonDataStreamService } from '../../../shared';
import { SkillsComponent } from './skills.component';

@Component({
    selector: 'skills-form',
    templateUrl: './skills-form.component.html',
    styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {

    @Input() skillDetail: any;
    @ViewChild('skillForm') form: any;

    dataStream: any;

    levels = [
        'Beginner',
        'Intermediate',
        'Expert'
    ];
    years: number[] = [];
    months: number[] = [];

    constructor(
        private serverService: ServerService,
        private parentComp: SkillsComponent,
        private cds: CommonDataStreamService
    ){
        for ( let i = 0; i < 100; i++ ) {
            this.years.push(i);
        }
        for ( let i = 0; i < 12; i++ ) {
            this.months.push(i);
        }
    }

    ngOnInit(){
        this.dataStream = this.cds.dataStream;
    }

    onSubmit(model: any): void{

        if (this.form.valid) {

            model.Employee_Id = this.skillDetail.Employee_Id;
            model.Id = this.skillDetail.Id;

            this.serverService.updateEmpSkillsDetails(model)
            .subscribe(
                (response) =>{
                    let body = response.json();
                    alert(body.message);
                    this.parentComp.getDetails();
                    this.parentComp.cancelEditForm();
                },
                (error) => {
                    alert(error);
                    console.log(error);
                }
            );
        }
        else {
            alert("Required fields are manadatory")
        }

    }

}
