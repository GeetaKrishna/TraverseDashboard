import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyHeartService {

  constructor(private http: HttpClient) { }

  addHR(hr){
    return this.http.post(`${environment.apiUrl}/myheart/hr/add`, hr);
  }

  updateHR(hr){
    return this.http.put(`${environment.apiUrl}/myheart/hr/${parseInt(localStorage.getItem("patientId"))}`, hr);
  }

  getHeartRate(){
    return this.http.get(`${environment.apiUrl}/myheart/hr/current/${parseInt(localStorage.getItem("patientId"))}`);
  }

  getEkgs(){
    return this.http.get(`${environment.apiUrl}/myheart/ekg/`);
  }
 
  getEkg(){
    return this.http.get(`${environment.apiUrl}/myheart/ekg/current/${parseInt(localStorage.getItem("patientId"))}`);
  }

  addEkg(ekg){
    return this.http.post(`${environment.apiUrl}/myheart/ekg/add`, ekg);
  }
  // getEkgByPatientId(){
  //   return this.http.get(`${environment.apiUrl}/myheart/ekg/${parseInt(localStorage.getItem("patientId"))}`);
  // }
  // getEkgByPatientId(){
  //   return this.http.get(`${environment.apiUrl}/myheart/ekg/${parseInt(localStorage.getItem("patientId"))}`);
  // }

}
