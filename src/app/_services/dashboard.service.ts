import { Injectable } from '@angular/core';
// import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

// import { Details } from '../details';
// import { map } from 'rxjs/operators';

// import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.apiUrl
  patientId = parseInt(localStorage.getItem("patientId"));
  year = new Date().toLocaleDateString().split('/')[2];

  constructor(private http: HttpClient) { }

  // add weights
  postWeight(jsonObject) {
    return this.http.post(this.url + '/fc/weight/add', jsonObject)
  }

  // get recent weight of patient
  getCurrentWeight() {
    return this.http.get(`${environment.apiUrl}/fc/weight/current/${this.patientId}`);
  }

  //weights for current year
  getweight() {
    return this.http.get(this.url + `/fc/weight/avg/${this.patientId}/${this.year}`);
  }

  //for average of weights
  getPatientsWeights() {
    return this.http.get(this.url + `/fc/weight/${this.patientId}`);
  }

  // for recent last two values.
  getPatientsTopTwoWeights() {
    return this.http.get(this.url + `/fc/weight/top2/${this.patientId}`);
  }
  getPatientsTopTwoCL() {
    return this.http.get(this.url + `/fc/cl/top2/${this.patientId}`);
  }
  getPatientsTopTwoGL() {
    return this.http.get(this.url + `/fc/gl/top2/${this.patientId}`);
  }
  getPatientsTopTwoBP() {
    return this.http.get(this.url + `/fc/bp/top2/${this.patientId}`);
  }

  // Glucose funcs

  //add Glucose
  sendGlucose(jsonObject) {
    return this.http.post(this.url + '/fc/gl/add', jsonObject)
  }

  getGlucoses() {
    return this.http.get(this.url + `/fc/gl/avg/${this.patientId}/${this.year}`);
  }

  getGlucoseofPatient() {
    return this.http.get(this.url + `/fc/gl/current/${this.patientId}`);
  }

  getPatientsGlucoses() {
    return this.http.get(this.url + `/fc/gl/${this.patientId}`);
  }

  // Cholesterol funcs

  // add cholesterol
  sendCholesterol(jsonObject) {
   return this.http.post(this.url + '/fc/cl/add', jsonObject)
  }
  getCholesterols() {
    return this.http.get(this.url + `/fc/cl/avg/${this.patientId}/${this.year}`);
  }
  getCholesterol() {
    return this.http.get(this.url + `/fc/cl/current/${this.patientId}`);
  }
  getPatientsCholesterol() {
    return this.http.get(this.url + `/fc/cl/${this.patientId}`);
  }

  // Blood funcs

  postBloodPressure(jsonObject) {
    return this.http.post(this.url + '/fc/bp/add', jsonObject)
  }
  getBloodPressures() {
    return this.http.get(this.url + `/fc/bp/avg/${this.patientId}/${this.year}`);
  }
  getBloodPressure() {
    return this.http.get(this.url + `/fc/bp/current/${this.patientId}`);
  }
  getPatientsBloodPressure() {
    return this.http.get(this.url + `/fc/bp/${this.patientId}`);
  }

}