import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { EmployeeService } from '../../../shared';
import { ResignComponent } from './resign.component';
import { ResignDetail } from './resign-detail.model';

@Component({
    selector: 'resign-update-form',
    templateUrl: './resign-update-form.component.html',
    styleUrls: ['./resign-update-form.component.scss']
})
export class ResignUpdateFormComponent implements OnInit {

    @Input() detailsObj: ResignDetail;
    @Input() action: string;
    @ViewChild('applUpdForm') form: any;

    approveAction: boolean = false;
    Comment: any;

    constructor(
        private empService: EmployeeService,
        private parentComp: ResignComponent
    ){

    }

    ngOnInit(){
        this.approveAction = this.action === 'approve';
    }

    onUpdateApplyResign(model: any): void{

        if (this.form.valid) {

            model.Employee_Id = this.detailsObj.Employee_Id;
            model.Updated_By_Id = this.detailsObj.Employee_Id;
            model.Status = 'Applied';

            console.log(model);
            this.empService.applyResignation(model)
            .subscribe(
                (response) => {
                    let body = response.json();
                    alert(body.message);
                    this.parentComp.getUpdates();
                    this.parentComp.showApplyUpdateForm = false;
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

    updateResign( model: any ): void {
        this.empService.updateResignation(model)
        .subscribe(
            (response) => {
                let body = response.json();
                alert(body.message);
                this.parentComp.getUpdates();
                this.parentComp.cancelEditForm();
            },
            (error) => {
                alert(error);
                console.log(error);
            }
        );
    }

    onApproveResign( model: any ): void {

        if (this.form.valid) {

            model.Employee_Id = this.detailsObj.Employee_Id;
            model.Updated_By_Id = sessionStorage.getItem("username");
            model.Status = 'Approved';

            this.updateResign(model);
        }
        else {
            alert("Required fields are manadatory")
        }

    }

    onRejectResign( model: any ): void {

        if (this.form.valid) {

            model.Employee_Id = this.detailsObj.Employee_Id;
            model.Updated_By_Id = sessionStorage.getItem("username");
            model.Status = 'Rejected';

            this.updateResign(model);
        }
        else {
            alert("Required fields are manadatory")
        }

    }

    cancelUpdate(){
        if ( this.action === 'apply' ) {
            this.parentComp.showApplyUpdateForm = false;
        } else if ( this.action === 'approve' ) {
            this.parentComp.cancelEditForm();
        }
        return false;
    }

}
