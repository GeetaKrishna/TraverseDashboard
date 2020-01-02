import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAppsService {

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject('default message');

  currentMessage = this.messageSource.asObservable();

  addApp(appData) {
    return this.http.post(`${environment.apiUrl}/userapps/add`, {
      "appId": appData,
      id: 0,
      "userId": parseInt(localStorage.getItem('userId')),
    })
  }

  deleteApp(appId) {
    console.log(appId);
    return this.http.delete(`${environment.apiUrl}/userapps/${parseInt(localStorage.getItem('userId'))}/${parseInt(appId)}`, { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) })
  }

  getWeightProfile() {
    return this.http.get<any>(`${environment.apiUrl}/Weight/PatientWeights`);
  }

  getAppStore(userId) {
    return this.http.get(`${environment.apiUrl}/userapps/${userId}`)
  }

}
