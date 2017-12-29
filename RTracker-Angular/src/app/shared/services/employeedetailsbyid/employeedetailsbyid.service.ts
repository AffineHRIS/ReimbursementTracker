import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { EmployeeDetailsById } from './employeedetailsbyid';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class EmployeeDetailsByIdService {

    private url1 = 'http://'+ this.globals.apiServerIP +':3100/employeeProfile/';

    constructor(
        private http:HttpClient,
        private globals: Globals
    ){}

    getEmployeeDetailsById(id: any): Promise<EmployeeDetailsById> {

        return this.http.get(this.url1 + id)
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details by id.', error);
        return Promise.reject(error.message || error);
    }

}
