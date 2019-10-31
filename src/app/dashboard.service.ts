import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Details } from './details';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.apiUrl

  testHeaders =
    { headers: new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3MTMzODgwOSwiaWF0IjoxNTcxMzIwODA5fQ.bcR47UAWCVghr7HbHzgXVznulgD-cD6jNZKt9abXvQlQgUmjjZe-J4yKZVF0-jtuIoDCBU1lfYJlwrdMovYpfw'
    }) };

  constructor(private http: HttpClient) { }
  patientId;
  year;
  //weight funcs
  getweight() {
    return this.http.get(this.url + '/Weight/AverageWeight/2/2019', this.testHeaders);
    // return this.http.get(this.url + `/Weight/AverageWeight/${this.patientId}/${this.year}`, this.testHeaders);
  }

  // createweight(body) {
  //   return this.http.post(this.url + '/Weight/PatientWeight', body);
  // }

  getDashboard() {
    // return this.http.get(this.url + `/Weight/CurrentWeight/${this.patientId}`, this.testHeaders);
    return this.http.get(this.url + `/Weight/CurrentWeight/2`);// No Patient
  }

  getWeightOfLoggedInUser() {
    return this.http.get(this.url + '/Weight/LoggedInUser');
  }

  getPatientsWeights() {
    return this.http.get(this.url + '/Weight/PatientWeights'); //working
  }

  // glucose funcs
  getGlucoses() {
    return this.http.get(this.url + '/GL/AverageGL/2/2019');
    // return this.http.get(this.url + `/GL/AverageGL/${this.patientId}/${this.year}`, this.testHeaders);
  }

  getGlucoseofPatient() {
    // return this.http.get(this.url + `/GL/CurrentGL/${this.patientId}`);
    return this.http.get(this.url + `/GL/CurrentGL/2`);
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
    // return this.http.get(this.url + `/CL/AverageCL/${this.patientId}/${this.year}`);
    return this.http.get(this.url + `/CL/AverageCL/2/2019`);
  }

  getCholesterol() {
    // return this.http.get(this.url + `/CL/CurrentCL/${this.patientId}`);
    return this.http.get(this.url + `/CL/CurrentCL/2`);
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
    // return this.http.get(this.url + `/BP/AverageBP/${this.patientId}/${this.year}`);
    return this.http.get(this.url + `/BP/AverageBP/2/2019`);
  }

  getBloodPressure() {
    // return this.http.get(this.url + `/BP/CurrentBP/${this.patientId}`);
    return this.http.get(this.url + `/BP/CurrentBP/2`);
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
    return this.http.post(this.url + '/Weight/PatientWeight', jsonObject)
    // this.http.post(this.url + '/Weight/PatientWeight', jsonObject).toPromise().then((data) => {
    //   console.log("returned object" + JSON.stringify(data));
    // })
  }

  sendCholesterol(jsonObject) {
    this.http.post(this.url + '/CL/PatientCL', jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }

  sendGlucose(jsonObject) {
    this.http.post(this.url + '/GL/PatientGL', jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }

  postBlood(jsonObject) {
    this.http.post(this.url + '/BP/PatientBP', jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }





}
