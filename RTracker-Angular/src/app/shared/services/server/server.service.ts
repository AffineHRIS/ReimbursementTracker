import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Globals } from '../../global';

@Injectable()
export class ServerService {
    constructor(
        private http:Http,
        private globals: Globals
    ) {}
    addEmployee(modelData: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3100/api/addEmployee',
            modelData,
            { headers: headers }
        );
    }

    addEmployeeBank(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3100/api/addEmployeeBank',
            model,
            { headers: headers }
        );
    }

    addEmployeeFamily(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/api/addEmployeeFamily',
            model,
            {headers: headers});
    }

    addEmployeeMobility(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/api/addEmployeeMobility',
            model,
            {headers: headers});
    }

    addEmployeeEducation(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/api/addEmployeeEducation',
            model,
            {headers: headers});
    }

    storeAssetsInfo(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/employeeAssetsInfo',
            model,
            {headers: headers});
    }

    // Add employee experience details.
    addEmployeeExperience(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/api/addEmployeeExperience',
            model,
            {headers: headers});
    }

    // Add employee history details.
    addEmpHistoryDetails(model:{}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3100/api/addEmployeeHistory',
            model,
            { headers: headers }
        );
    }

    // Add employee skill details.
    addEmployeeSkills(model:{}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3100/api/addEmployeeSkills',
            model,
            { headers: headers }
        );
    }


    // Update employee basic details.
    updateEmployeeDetails(modelData) {
        var url = 'http://'+ this.globals.apiServerIP +':3100/api/updateEmployee/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            url,
            JSON.stringify(modelData),
            {headers: headers}
        );
    }

    // Update employee bank details.
    updateEmpBankDetails(modelData) {
        var url = 'http://'+ this.globals.apiServerIP +':3100/api/updateEmployeeBank/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            url,
            JSON.stringify(modelData),
            {headers: headers}
        );
    }

    // Update employee family/relation details.
    updateEmpFamilyDetails(modelData) {
        var url = 'http://'+ this.globals.apiServerIP +':3100/api/updateEmployeeFamily/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            url,
            JSON.stringify(modelData),
            {headers: headers}
        );
    }

    // Update employee passport details.
    updatePassportDetails(modelData) {
        var url = 'http://'+ this.globals.apiServerIP +':3100/api/updateEmployeeMobility/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            url,
            JSON.stringify(modelData),
            {headers: headers}
        );
    }

    // Update employee education details.
    updateEducationDetails(modelData) {
        var url = 'http://'+ this.globals.apiServerIP +':3100/api/updateEmployeeEducation/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            url,
            JSON.stringify(modelData),
            {headers: headers}
        );
    }

    // Update employee experience details.
    updateEmpExperienceDetails(modelData) {
        var url = 'http://'+ this.globals.apiServerIP +':3100/api/updateEmployeeExperience';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            url,
            JSON.stringify(modelData),
            {headers: headers}
        );
    }

    // Update employee experience details.
    updateEmpSkillsDetails(modelData) {
        var url = 'http://'+ this.globals.apiServerIP +':3100/api/updateEmployeeSkills';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            url,
            JSON.stringify(modelData),
            {headers: headers}
        );
    }

    // Update employee history details.
    updateEmpHistoryDetails(modelData) {
        var url = 'http://'+ this.globals.apiServerIP +':3100/api/updateEmployeeHistory';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            url,
            JSON.stringify(modelData),
            {headers: headers}
        );
    }
    filterEducation(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/filterEmpEducation',
            model,
            {headers: headers});
    }

    filterExperience(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/filterEmpExperience',
            model,
            {headers: headers});
    }

    filterContactdetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/filterEmpContact',
            model,
            {headers: headers});
    }

    filterPersonalDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://'+ this.globals.apiServerIP +':3100/filterPersonalDetails',
            model,
            {headers: headers});
    }
}
