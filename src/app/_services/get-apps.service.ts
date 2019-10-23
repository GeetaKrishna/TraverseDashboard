import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAppsService {

  httpOptions = {
    headers: new HttpHeaders({
      // 'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3MTMzODgwOSwiaWF0IjoxNTcxMzIwODA5fQ.bcR47UAWCVghr7HbHzgXVznulgD-cD6jNZKt9abXvQlQgUmjjZe-J4yKZVF0-jtuIoDCBU1lfYJlwrdMovYpfw'
    }),

  }

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject('default message');

  currentMessage = this.messageSource.asObservable();

  addApp(appData) {
    // API CAll to add this into array.
    let installAppData = appData;
    installAppData.PatientID = 2;
    this.messageSource.next(installAppData)
    console.log(installAppData)
    return this.http.post(`http://localhost:3000/landing`, installAppData)
  }
  
  deleteApp(appId) {
    console.log(appId);
    let body = { "id": appId }
    return this.http.post(`http://localhost:3000/landing/uninstallApp`, body)
  }

  // createWeightProfile(){

  // }
  // getToken(){
  //   return this.http.post<any>(`${environment.apiUrl}/authenticate`,{"password": "admin","username": "admin" });
  // }
  getWeightProfile() {

    // return this.http.get<any>(`${environment.apiUrl}/Weight/PatientWeights`, this.httpOptions );
    return this.http.get<any>(`${environment.apiUrl}/Weight/PatientWeights`, this.httpOptions);
  }

  getAppStore() {
    return this.http.get(`http://localhost:3000/landing/2`)
  }


}
