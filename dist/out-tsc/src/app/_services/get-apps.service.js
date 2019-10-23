import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
let GetAppsService = class GetAppsService {
    constructor(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({
                // 'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3MTMzODgwOSwiaWF0IjoxNTcxMzIwODA5fQ.bcR47UAWCVghr7HbHzgXVznulgD-cD6jNZKt9abXvQlQgUmjjZe-J4yKZVF0-jtuIoDCBU1lfYJlwrdMovYpfw'
            }),
        };
        this.messageSource = new BehaviorSubject('default message');
        this.currentMessage = this.messageSource.asObservable();
    }
    addApp(id) {
        // API CAll to add this into array.
        this.messageSource.next(id);
    }
    createWeightProfile() {
    }
    getToken() {
        return this.http.post(`http://172.17.5.45:8080/authenticate`, { "password": "admin", "username": "admin" });
    }
    getWeightProfile() {
        // return this.http.get<any>(`${environment.apiUrl}/Weight/PatientWeights`, this.httpOptions );
        return this.http.get(`http://172.17.5.45:8080/Weight/PatientWeights`, this.httpOptions);
    }
};
GetAppsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], GetAppsService);
export { GetAppsService };
//# sourceMappingURL=get-apps.service.js.map