import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let DashboardService = class DashboardService {
    constructor(http) {
        this.http = http;
        this.url = 'http://localhost:8080';
        this.testHeaders = { headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer '
            }) };
    }
    //weight funcs
    getweight() {
        // return this.http.get(this.url + '/Weight/AverageWeight/2/2019');
        return this.http.get(this.url + `/Weight/AverageWeight/${this.patientId}/${this.year}`, this.testHeaders);
    }
    // createweight(body) {
    //   return this.http.post(this.url + '/Weight/PatientWeight', body);
    // }
    getDashboard() {
        return this.http.get(this.url + `/Weight/CurrentWeight/${this.patientId}`, this.testHeaders);
    }
    getWeightOfLoggedInUser() {
        return this.http.get(this.url + '/Weight/LoggedInUser');
    }
    getPatientsWeights() {
        return this.http.get(this.url + '/Weight/PatientWeights');
    }
    // glucose funcs
    getGlucoses() {
        return this.http.get(this.url + `/GL/AverageGL/${this.patientId}/${this.year}`, this.testHeaders);
    }
    getGlucoseofPatient() {
        return this.http.get(this.url + `/GL/CurrentGL/${this.patientId}`);
    }
    getGlucoseOfLoggedInUser() {
        return this.http.get(this.url + '/GL/LoggedInUser');
    }
    // postGlucose(body) {
    //   return this.http.post(this.url + '/GL/PatientGL', body);
    // }
    getPatientsGlucoses() {
        return this.http.get(this.url + '/GL/PatientGLs');
    }
    // Cholesterol funcs
    getCholesterols() {
        return this.http.get(this.url + `/CL/AverageCL/${this.patientId}/${this.year}`);
    }
    getCholesterol() {
        return this.http.get(this.url + `/CL/CurrentCL/${this.patientId}`);
    }
    getCholesterolOfLoggedInUser() {
        return this.http.get(this.url + '/CL/LoggedInUser');
    }
    // postCholesterol(body) {
    //   return this.http.post(this.url + '/CL/PatientCL', body);
    // }
    getPatientsCholesterol() {
        return this.http.get(this.url + '/CL/PatientCLs');
    }
    // Blood funcs
    getBloodPressures() {
        return this.http.get(this.url + `/BP/AverageBP/${this.patientId}/${this.year}`);
    }
    getBloodPressure() {
        return this.http.get(this.url + `/BP/CurrentBP/${this.patientId}`);
    }
    getBloodPressureOfLoggedInUser() {
        return this.http.get(this.url + '/BP/LoggedInUser');
    }
    // postBloodPressure(body) {
    //   return this.http.post(this.url + '/BP/PatientBP', body);
    // }
    getPatientsBloodPressure() {
        return this.http.get(this.url + '/BP/PatientBPs');
    }
    postWeight(jsonObject) {
        this.http.post(this.url + '/Weight/PatientWeight', jsonObject).toPromise().then((data) => {
            console.log("returned object" + JSON.stringify(data));
        });
    }
    sendCholesterol(jsonObject) {
        this.http.post(this.url + '/CL/PatientCL', jsonObject).toPromise().then((data) => {
            console.log("returned object" + JSON.stringify(data));
        });
    }
    sendGlucose(jsonObject) {
        this.http.post(this.url + '/GL/PatientGL', jsonObject).toPromise().then((data) => {
            console.log("returned object" + JSON.stringify(data));
        });
    }
    postBlood(jsonObject) {
        this.http.post(this.url + '/BP/PatientBP', jsonObject).toPromise().then((data) => {
            console.log("returned object" + JSON.stringify(data));
        });
    }
};
DashboardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], DashboardService);
export { DashboardService };
//# sourceMappingURL=dashboard.service.js.map