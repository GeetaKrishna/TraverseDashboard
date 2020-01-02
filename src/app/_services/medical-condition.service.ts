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

  editMedicalCondition(id,conditionName, linkToApi, severity, triggers, body) {
    return this.http.put(`${environment.apiUrl}/editmed/${id}?conditionName=${conditionName}&linkToApi=${linkToApi}&severity=${severity}&triggers=${triggers}`, body);
  }

  deleteMedicalCondition(id) {
    console.log('removed', id);

    return this.http.delete(`${environment.apiUrl}/conditions-types/${parseInt(id)}`);
  }


}
