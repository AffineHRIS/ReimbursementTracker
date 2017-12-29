import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { EmployeeIdName } from './employeeIdName';
import { Globals } from '../../shared';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeIdNameService {

    private url1 = 'http://'+ this.globals.apiServerIP +':3100/employeeIdName';
    constructor(
        private http:HttpClient,
        private globals: Globals
    ){}

    getEmployeeIdName(): Promise<EmployeeIdName> {

        return this.http.get(this.url1)
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
