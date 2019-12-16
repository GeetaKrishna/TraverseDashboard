import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyHeartService {

  constructor(private http: HttpClient) { }

  getHeartRateByPatientId(){
    return this.http.get(`${environment.apiUrl}/myheart/hr/${parseInt(localStorage.getItem("patientId"))}`);
  }

  getEkgByPatientId(){
    return this.http.get(`${environment.apiUrl}/myheart/ekg/${parseInt(localStorage.getItem("patientId"))}`);
  }

}
