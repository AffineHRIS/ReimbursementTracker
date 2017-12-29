import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../../../shared';

@Injectable()
export class FilterService {
    constructor(
        private http:Http,
        private globals: Globals
    ) {}


    filterEducation(): Promise<any> {
        return this.http.get('http://'+ this.globals.apiServerIP +':3100/api/filterEmpEducation')
            .toPromise()
            .then(response => response)
            .catch(this.handleError);

    };
    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
