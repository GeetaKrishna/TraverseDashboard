import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
  addMedication(jsonObject) {
    console.log(jsonObject, 'apiii');
    return this.http.post(`${environment.apiUrl}/api/medications/addmedication`, jsonObject)
    // .toPromise().then((data) => {
    //   console.log("returned object" + JSON.stringify(data));
    // })
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

  deleteMedtcations(medid) {
    return this.http.delete(`${environment.apiUrl}/api/medications/deletemed/${medid}`);
  }
  
}
