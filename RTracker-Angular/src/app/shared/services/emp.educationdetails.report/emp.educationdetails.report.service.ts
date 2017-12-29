import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class educationalDetailsReportsService {
    private firstUrl = 'http://'+ this.globals.apiServerIP +':3100/qualificationDetails';
    constructor(
        private http:HttpClient,
        private globals: Globals
    ){}
    getEducationalDetailsReports(): Promise<any> {
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
