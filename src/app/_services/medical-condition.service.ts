import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalConditionService {

  constructor(private http: HttpClient) { }

  getMedicalCondition() {
    return this.http.get(`${environment.apiUrl}/medical-condition/2`);
  }

  addMedicalCondition(medicalConditionsData) {
    console.log(medicalConditionsData, 'data');
    return this.http.post(`${environment.apiUrl}/add-condition-types`, medicalConditionsData)
  }

  editMedicalCondition(id, description, name, schedule, body) {
    console.log(id, description, name, schedule, body);
    
    return this.http.put(`${environment.apiUrl}/api/medicatdions/editmed/${id}?DESCRIPTIdsaON=${description}&MEDNAME=${name}&MEDSCHEDULE=${schedule}`, body);
    // return this.http.put(`${environment.apiUrl}/api/medications/editmed/${id}?DESCRIPTION=${description}&MEDNAME=${name}&MEDSCHEDULE=${schedule}`, body);
  }

  deleteMedicalCondition(id) {
    console.log('removed', id);

    return this.http.delete(`${environment.apiUrl}/conditions-types/${parseInt(id)}`);
  }


}
