import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { companyProjectService, CommonDataStreamService } from '../../../../shared';
import { ProjectsTabContentComponent } from './projects-tab-content.component'
import { EmployeeIdNameService, EmployeeIdName } from '../../../../services';
import { EmployeeService } from '../../../../shared';
@Component({
    selector: 'project-list-form',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})

export class ProjectListComponent implements OnInit {

    constructor(
        private companyProjectService: companyProjectService,
        private cds: CommonDataStreamService,
        private projectList : ProjectsTabContentComponent,
        private empService: EmployeeService) {
            this.filesToUpload = [];
        }

    @ViewChild('f') form: any;

    filesToUpload: Array<File>;

    projectDetails: any = {};
    dataStream: any;
    employeeIdNames : EmployeeIdName;
    showAddprojects : boolean = true;
    showAddprojectsButton:boolean = false;

    MSA_thumbHidden:boolean = true;
    NDA_thumbHidden:boolean = true;
    Profitability_thumbHidden:boolean = true;
    SOW_thumbHidden:boolean = true;

    ngOnInit(): void {
        this.dataStream = this.cds.dataStream;
    }

    upload(file) {
        this.makeFileRequest("http://localhost:3100/upload", [], this.filesToUpload).then((result) => {
            console.log(file);
            if(file == "SOW_File") {
                this.projectDetails.SOW_File =result[0].filename;
                this.SOW_thumbHidden =false;

            }
            else if (file == "profitability") {
                this.projectDetails.profitability =result[0].filename;
                this.Profitability_thumbHidden = false
            }
            else if (file == "NDA_File") {
                this.projectDetails.NDA_File =result[0].filename;
                this.NDA_thumbHidden = false
            }
            else if (file == "MSA_File") {
                this.projectDetails.MSA_File =result[0].filename;
                this.MSA_thumbHidden = false            }
            console.log(result[0].filename);
            // console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            console.log(files)
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
                console.log(files[i].name)
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    showAddProject():void {
        this.showAddprojectsButton=true;
        this.showAddprojects = false;
    }
    showAddProjectTab():void{
        this.showAddprojects = true;
        this.showAddprojectsButton = false;
    }
    save(model: any):void {
        if (this.form.valid) {

            var modelData = Object.assign({}, model);
            console.log( modelData );
            this.companyProjectService.addProjectDetails(modelData)
            .subscribe(
                (response) =>{
                    let body = response.json();
                    alert(body.message);
                    this.projectList.getCompanyProjects();
                    this.projectList.showForm(0);

                },
                (error) => {
                    alert(error);
                    console.log(error);
                }
            );

            this.showAddprojectsButton=false;
            this.showAddprojects = true;

        }
        else {
            alert("Required fields are manadatory")
        }

    }
}
