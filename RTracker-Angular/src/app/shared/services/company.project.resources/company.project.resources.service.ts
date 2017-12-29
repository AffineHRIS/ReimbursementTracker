import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ProjectDetails } from "./company.project.resources";
import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class companyProjectService {

    private projectDetailsUrl = 'http://'+ this.globals.apiServerIP +':3100/companyProjects';
    private detailsUrl = 'http://'+ this.globals.apiServerIP +':3100/projectDetails/';
    constructor(
        private http:Http,
        private httpClient: HttpClient,
        private globals: Globals
    ){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getCompanyProjectDetails(): Promise<any> {

        return this.httpClient.get(this.projectDetailsUrl)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };

    getProjectDetails(data:any): Promise<any> {

        return this.httpClient.get('http://'+ this.globals.apiServerIP +':3100/projectDetails/'+data)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };


    addProjectDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3100/api/addProjectDetails',
            model,
            { headers: headers }
        );
    }
}
