import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

  private listEmployeesUrl = 'http://localhost:8181/employeeId11';

  constructor(private http:HttpClient ){

  }

  getEmployees(): Promise<Employee[]> {

    return this.http.get(this.listEmployeesUrl)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);

  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred while fetching the list of employees', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
