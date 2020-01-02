import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private http: HttpClient) { }

  getMedications() {
    return this.http.get(`${environment.apiUrl}/medications/med/`);
  }

  getPrescriptions() {
    return this.http.get(`${environment.apiUrl}/medications/prescriptions/p/${parseInt(localStorage.getItem("patientId"))}`);
  }

  addMedication(medication) {
    console.log(medication, 'apiii');
    return this.http.post(`${environment.apiUrl}/medications/med/add`, medication)
  }

  addPrescription(prescription) {
    console.log(prescription, 'apiii');
    return this.http.post(`${environment.apiUrl}/medications/prescriptions/add`, prescription)
  }

  editMedications(id, description, name, schedule, body) {
    return this.http.put(`${environment.apiUrl}/api/medications/editmed/${id}?DESCRIPTION=${description}&MEDNAME=${name}&MEDSCHEDULE=${schedule}`, body);
  }

  editPrescription(body) {
    return this.http.put(`${environment.apiUrl}/medications/prescriptions/${body.id}`, body);
  }

  deletePrescription(prescriptionId) {
    return this.http.delete(`${environment.apiUrl}/medications/prescriptions/${prescriptionId}`);
  }

}
