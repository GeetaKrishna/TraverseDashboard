import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  createAppoinments(appointment) {
    return this.http.post(`${environment.apiUrl}/calendar/appointments/add`, appointment)
  }

  getAppointments() {
    return this.http.get(`${environment.apiUrl}/calendar/appointments/${parseInt(localStorage.getItem("userId"))}/${parseInt(localStorage.getItem("patientId"))}`)
  }

  editAppoinments(appointment) {
    return this.http.put(`${environment.apiUrl}/calendar/appointments/${appointment.pid}`, appointment)
  }

  deleteAppoinmentById(id) {
    return this.http.delete(`${environment.apiUrl}/calendar/appointments/${id}`)
  }

}
