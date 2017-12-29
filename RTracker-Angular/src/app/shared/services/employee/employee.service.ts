import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from '../../global';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

    private url1 = 'http://'+ this.globals.apiServerIP +':3100/api/applyResignation';
    private url2 = 'http://'+ this.globals.apiServerIP +':3100/api/getResAppUpdates';
    private url3 = 'http://'+ this.globals.apiServerIP +':3100/api/updateResignation';
    private url4 = 'http://'+ this.globals.apiServerIP +':3100/api/getResources';
    private url5 = 'http://'+ this.globals.apiServerIP +':3100/api/updateResources';

    constructor(
        private http: Http,
        private httpClient:HttpClient,
        private globals: Globals
    ){ }

    applyResignation(modelData: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            this.url1,
            modelData,
            { headers: headers }
        );
    }

    updateResignation(modelData: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            this.url3,
            modelData,
            { headers: headers }
        );
    }

    getResignUpdates(empid: string): Promise<any> {

        return this.httpClient.get(
            this.url2 + '?employeeid=' + empid
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    getResourcesDetails(){
        return this.httpClient.get(
            this.url4
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);
    }

    updateResourcesDetails(modelData: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            this.url5,
            modelData,
            { headers: headers }
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the list of employees', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
