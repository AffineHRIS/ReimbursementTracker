import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response} from "@angular/http";
import { companyProjectService,Globals } from '../../../../shared';


@Component({
  selector: 'app-projects-tab-content',
  templateUrl: './projects-tab-content.component.html',
  styleUrls: ['./projects-tab-content.component.scss']
})

export class ProjectsTabContentComponent implements OnInit {

  constructor(private companyProjectService: companyProjectService,
              private globals: Globals) { }

  ProjectsList: any = [];
  details : any = [];
  hideEditButton: boolean = false;
  hideTab:boolean = false;
  showProjects:boolean = false;
  showTab:boolean = true;
  showAddprojectsButton:boolean = false;
  reloadData:boolean = true;
  SOWFilePath:any;
  ProfitabilityFilePath:any;
  NDAFilePath:any;
  MSAFilePath:any;

  ngOnInit() {
      this.getCompanyProjects();
      this.showForm(0);
  }

    index: any = -1;
    showEditForm(i): void {
        this.index = i;
    }
    showForm(i): void {
        this.index = i;
        this.hideEditButton = true;
    }
    cancelEditForm(): void {
        this.index = -1;
    }

    showProjectTab():void{
      this.showProjects = false;
      this.showTab = true;
      this.showAddprojectsButton = false;
    }

    getCompanyProjects(): void {
      this.reloadData = false;
        this.companyProjectService.getCompanyProjectDetails().then(projectDetails => {
            this.ProjectsList = projectDetails[0].data;
            this.reloadData = true;
        });
     }

    showProject(data): void {
        // console.log(data);
        this.companyProjectService.getProjectDetails(data).then(details => {
            this.details =  details;
            this.SOWFilePath = 'http://'+ this.globals.apiServerIP +':3100/uploads/' + this.details.Project_Docs[0].SOW_File;
            this.ProfitabilityFilePath = 'http://'+ this.globals.apiServerIP +':3100/uploads/' + this.details.Project_Docs[0].Profitability_File;
            this.NDAFilePath = 'http://'+ this.globals.apiServerIP +':3100/uploads/' + this.details.Project_Docs[0].NDA_File;
            this.MSAFilePath = 'http://'+ this.globals.apiServerIP +':3100/uploads/' + this.details.Project_Docs[0].MSA_File;

            console.log(this.details)
        });
        this.showProjects = true;
        this.showTab = false;
        this.showAddprojectsButton = true;
    }

}
