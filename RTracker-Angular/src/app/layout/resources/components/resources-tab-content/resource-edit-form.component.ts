import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { CommonDataStreamService, EmployeeService } from '../../../../shared';
import { ResourcesTabContentComponent } from './resources-tab-content.component';

@Component({
    selector: 'resource-edit-form',
    templateUrl: './resource-edit-form.component.html',
    styleUrls: ['./resource-edit-form.component.scss']
})
export class ResourceEditFormComponent implements OnInit {

    @Input() resDetails: any;
    @ViewChild('resForm') form: any;

    dataStream: any;
    accountsList: any = [];
    projectsList: any = [];

    Accounts: any = [];
    Projects: any = [];

    constructor(
        private cds: CommonDataStreamService,
        private empService: EmployeeService,
        private parentComp: ResourcesTabContentComponent
    ){

    }

    ngOnInit(){
        this.dataStream = this.cds.dataStream;
        this.loadProjects( this.resDetails.AccountIds );
    }

    onSubmit(model: any): void {

        if (this.form.valid) {

            model.Id = this.resDetails.Id;
            model.Employee_Id = this.resDetails.Employee_Id;

            console.log( model );

            this.empService.updateResourcesDetails(model)
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

    loadAccounts(event: any): void {
        var selAccs = event.target.selectedOptions;
        this.accountsList = [];
        for (let i = 0; i < selAccs.length; i++) {
            this.accountsList.push( selAccs[i].value.split(' ')[1].replace(/'/g,'') );
        }
        this.loadProjects( this.accountsList );
    }

    loadProjects(selAccsList: any): void {
        this.projectsList = [];
        this.projectsList = this.dataStream.projects.filter(function(obj){
            return selAccsList.indexOf( obj.Account_Id ) !== -1;
        });

    }

}
