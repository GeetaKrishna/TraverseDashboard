import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  url = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getPlans() {
    return this.http.get(this.url + '/insurance/plans');
  }

  getClaims() {
    return this.http.get(this.url + '/insurance/claims');
  }

  getPlansByPatientId(patientId) {
    return this.http.get(this.url + `/insurance/plans/${patientId}`);
  }

  getClaimsByPatientId(patientId) {
    return this.http.get(this.url + `/insurance/claims/${patientId}`);
  }

  getAllPatientsList() {
    return this.http.get(this.url + `/patients/u/${localStorage.getItem("userId")}`);
  }

}
