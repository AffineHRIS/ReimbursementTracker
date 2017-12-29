import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class CommonDataStreamService {

    private url1 = 'http://'+ this.globals.apiServerIP +':3100/basicDetails';
    dataStream : any;

    constructor(
        private http:HttpClient,
        private globals: Globals
    ){

    }

    fetchBasicDetails() : void {
        this.commondDataStream().then( dataStream => {
            this.dataStream = dataStream[0].data;
            this.globals.updateBasicDetails();
        });
    }

    commondDataStream(): Promise<any> {

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
