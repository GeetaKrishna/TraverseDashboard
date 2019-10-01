import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Details } from './details';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

 

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url= 'http://localhost:8082'
  constructor(private http: HttpClient) { }
  getweight(){

    return this.http.get(this.url + '/Weight/AverageWeight/2/2019');
    // return this.http.get(this.avgurl);
    }
  getDashboard() {
    return this.http.get(this.url + '/Weight/CurrentWeight/6');
  }

  getGlucose(){
    return this.http.get(this.url + '/GL/CurrentGL/1');
  }

  getCholesterol(){
    return this.http.get(this.url + '/CL/CurrentCL/2');
  }

  getBlood(){
    return this.http.get<any>(this.url + '/BP/CurrentBP/2');
  }
  postWeight(jsonObject){
    this.http.post(this.url + '/Weight/PatientWeight', jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }
  
  sendCholesterol(jsonObject){
    this.http.post(this.url + '/CL/PatientCL', jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }

  sendGlucose(jsonObject){
    this.http.post(this.url + '/GL/PatientGL', jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }

  postBlood(jsonObject){
    this.http.post(this.url + '/BP/PatientBP', jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }



  
  
}
