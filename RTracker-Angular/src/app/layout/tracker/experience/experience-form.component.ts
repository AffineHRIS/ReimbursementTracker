import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ServerService, CommonDataStreamService } from '../../../shared';
import { ExperienceComponent } from './experience.component';

@Component({
    selector: 'experience-form',
    templateUrl: './experience-form.component.html',
    styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {

    @Input() expDetails: any;
    @ViewChild('expForm') form: any;

    dataStream: any;

    constructor(
        private serverService: ServerService,
        private parentComp: ExperienceComponent,
        private cds: CommonDataStreamService
    ){

    }

    ngOnInit(){
        this.dataStream = this.cds.dataStream;
    }

    onSubmit(model: any): void{

        if (this.form.valid) {

            model.Employee_Id = this.expDetails.Employee_Id;
            model.Experience_Id = this.expDetails.Experience_Id;

            console.log( model );
            this.serverService.updateEmpExperienceDetails(model)
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
