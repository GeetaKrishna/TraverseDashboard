import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private http: HttpClient) { }

  getMedtcations() {
    // return this.http.get(`${environment.apiUrl}/api/medications/getmedpres/2`);
    return this.http.get(`${environment.apiUrl}/api/medications/getmeds`);

  }

  addMedication(medication) {
    console.log(medication, 'apiii');
    return this.http.post(`${environment.apiUrl}/api/medications/addmedication`, medication)
  }
  addMedicationPP(jsonObject) {
    this.http.post(`${environment.apiUrl}/api/medications/addPP`, jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }
  addMedicationPPD(jsonObject) {
    this.http.post(`${environment.apiUrl}/api/medications/addPPD`, jsonObject).toPromise().then((data) => {
      console.log("returned object" + JSON.stringify(data));
    })
  }

  editMedications(id, description, name, schedule, body) {
    return this.http.put(`${environment.apiUrl}/api/medications/editmed/${id}?DESCRIPTION=${description}&MEDNAME=${name}&MEDSCHEDULE=${schedule}`, body );
  }

  deleteMedtcations(medid) {
    return this.http.delete(`${environment.apiUrl}/api/medications/deletemed/${medid}`);
  }

}
