import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { PersonalDetails } from "./emp.personaldetails.report";

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class personalDetailsReportsService {
    private firstUrl = 'http://'+ this.globals.apiServerIP +':3100/empPersonalDetails';
    constructor(
        private http:HttpClient,
        private globals: Globals 
    ){}
    getPersoanlDetailsReports(): Promise<PersonalDetails> {
        return this.http.get(this.firstUrl)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };
    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
