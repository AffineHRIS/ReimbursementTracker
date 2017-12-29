import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ExperienceDetails } from "./emp.experience.report";
import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class empExpReportsService {

    private firstUrl = 'http://'+ this.globals.apiServerIP +':3100/empExperieceCount';
    private designationUrl = 'http://'+ this.globals.apiServerIP +':3100/designationCounts';
    private contactDetailsUrl = 'http://'+ this.globals.apiServerIP +':3100/reportsEmpContactDetails';
    constructor(
        private http:Http,
        private httpClient: HttpClient,
        private globals: Globals
    ){}

    getEmployeeExpReports(): Promise<ExperienceDetails> {

        return this.httpClient.get(this.firstUrl)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };

    getEmployeeDesignationCount(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/designationCounts',
            model,
            {headers: headers});
    }

    getEmployeeDiversityRatio(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/diversityRatio',
            model,
            {headers: headers});
    }

    getEmployeeSourceOfHire(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/sourceOfHire',
            model,
            {headers: headers});
    }

    getEmployeeContactDetails(): Promise<any> {

        return this.httpClient.get(this.contactDetailsUrl)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
