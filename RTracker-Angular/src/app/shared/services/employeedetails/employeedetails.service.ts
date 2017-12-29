import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { EmployeeDetails } from './employeedetails';
import { EmployeeIdName } from '../employeeidname/employeeidname';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class EmployeeDetailsService {

    constructor(
        private http:HttpClient,
        private globals: Globals
    ){}

    getBasicDetails(empid: string): Promise<any> {

        let params = new HttpParams();
        params = params.append('employeeid', empid);

        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/getBasicDetails/',
            {params: params}
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    getBankDetails(empid: string): Promise<any> {

        let params = new HttpParams();
        params = params.append('employeeid', empid);

        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/getBankDetails/',
            {params: params}
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    getFamilyDetails(empid: string): Promise<any> {

        let params = new HttpParams();
        params = params.append('employeeid', empid);

        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/getFamilyDetails/',
            {params: params}
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);
    };

    getPassportDetails(empid: string): Promise<any> {

        let params = new HttpParams();
        params = params.append('employeeid', empid);

        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/getPassportDetails/',
            {params: params}
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    getEducationDetails(empid: string): Promise<any> {

        let params = new HttpParams();
        params = params.append('employeeid', empid);

        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/getEducationDetails/',
            {params: params}
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    getExperienceDetails(empid: string): Promise<any> {

        let params = new HttpParams();
        params = params.append('employeeid', empid);

        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/getExperienceDetails/',
            {params: params}
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };


    getSkillsDetails(empid: string): Promise<any> {

        let params = new HttpParams();
        params = params.append('employeeid', empid);

        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/api/getEmpSkills/',
            {params: params}
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };


    getHistoryDetails(empid: string): Promise<any> {

        let params = new HttpParams();
        params = params.append('employeeid', empid);

        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/api/getEmpCompanyHistory/',
            {params: params}
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    getEmployeeReportDetails(): Promise<any> {
        return this.http.get(
            'http://'+ this.globals.apiServerIP +':3100/api/employeereportdetails'
        )
        .toPromise()
        .then(response => response)
        .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
