import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }
  getAllPatientsList() {
    return this.http.get(this.url + `/patients/u/${localStorage.getItem("userId")}`);
  }

  removePatient(pId) {
    return this.http.delete(this.url + `/patients/${pId}`);
  }
}
