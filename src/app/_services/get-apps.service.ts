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
    // let installAppData = appData;
    // installAppData.PatientID = 2;
    // this.messageSource.next(installAppData)
    // console.log(installAppData)
    // http://172.17.12.143:8300/thc/userapps/add
   
    return this.http.post(`${environment.apiUrl}/userapps/add`, {
      "appId": appData,
      id: 0,
      "userId": parseInt(localStorage.getItem('userId')),
    })
  }
  
  deleteApp(appId) {
    console.log(appId);
    // let body = { "id": appId }

    // http://172.17.12.143:8300/thc/userapps/1234567/12345678

    return this.http.delete(`${environment.apiUrl}/userapps/${parseInt(localStorage.getItem('userId'))}/${parseInt(appId)}`, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})})
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

  getAppStore(userId) {
    // http://172.17.12.143:8300/thc/userapps/?
    return this.http.get(`${environment.apiUrl}/userapps/${userId}`)
  }


}
