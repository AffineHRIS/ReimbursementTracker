import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../../../shared';

@Component({
  selector: 'app-resign',
  templateUrl: './resign.component.html',
  styleUrls: ['./resign.component.scss']
})
export class ResignComponent implements OnInit {

  employeeid: string;
  employeename: string = sessionStorage.getItem('empname');
  showApplyForm: boolean = false;
  showApplyUpdateForm: boolean = false;
  showApprUpdates: boolean = false;
  Resign_Date: Date = new Date(); // Today
  Term_Date: Date = new Date(this.Resign_Date.getTime() + ( 30 * 24 * 60 * 60 * 1000 )); // 30 days from today
  @ViewChild('f') form: any;
  applicationUpdates: any;
  approvalUpdates: any;
  lastApplUpdate: any;
  actionApply: string = 'apply';
  actionApprove: string = 'approve';

  constructor(
      private route: ActivatedRoute,
      private empService: EmployeeService
  ) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
         this.employeeid = params['id'];
         if ( this.employeeid === undefined ) {
             this.employeeid = sessionStorage.getItem("username");
         }

         this.getUpdates();
      });
  }

  getUpdates(): void {
      this.empService.getResignUpdates( this.employeeid ).then(result => {
          if ( result && result.data ) {
              this.applicationUpdates = result.data.applicationUpdates;
              this.approvalUpdates = result.data.approvalUpdates;

              this.showApplyForm = this.applicationUpdates.length ? false : true;
              this.lastApplUpdate = this.applicationUpdates[0];

              this.showApprUpdates = this.approvalUpdates.length ? true : false;
          }
      });
  }

  onApplyResign(model: any): void {
      if (this.form.valid) {

          model.Employee_Id = this.employeeid;
          model.Updated_By_Id = this.employeeid;
          model.Status = 'Applied';

          console.log(model);
          this.empService.applyResignation(model)
          .subscribe(
              (response) => {
                  let body = response.json();
                  alert(body.message);
                  this.getUpdates();
              },
              (error) => {
                  alert(error);
                  console.log(error);
              }
          );
      } else {
          alert("Mandatory fields are required.");
      }
  }

  onApplyUpdateForm() {
      this.showApplyUpdateForm = true;
  }

  index: any = -1;
  showEditForm(i): void {
      this.index = i;
  }
  cancelEditForm(): void {
      this.index = -1;
  }
  hideForm(i): boolean {
      return this.index === i;
  }

}
