import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ServerService, CommonDataStreamService } from '../../../shared';
import { HistoryComponent } from './history.component';

@Component({
    selector: 'history-form',
    templateUrl: './history-form.component.html',
    styleUrls: ['./history-form.component.scss']
})
export class HistoryFormComponent implements OnInit {

    @Input() histDetails: any;
    @ViewChild('histForm') form: any;

    dataStream: any;

    constructor(
        private serverService: ServerService,
        private parentComp: HistoryComponent,
        private cds : CommonDataStreamService
    ){

    }

    ngOnInit(){
        this.dataStream = this.cds.dataStream;
        // console.log( this.histDetails );
    }

    onSubmit(model: any): void{

        if (this.form.valid) {

            model.Employee_Id = this.histDetails.Employee_Id;
            model.Employee_Company_History_Id = this.histDetails.Employee_Company_History_Id;

            // console.log( model );

            this.serverService.updateEmpHistoryDetails(model)
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
