import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    register(registrationData, HEIGHT, WEIGHT) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
            })
        };

        return this.http.post(`${environment.apiUrl}/users/add/${parseFloat(HEIGHT)}/${parseFloat(WEIGHT)}`, registrationData, httpOptions);
    }

    registerPatient(body) {
        return this.http.post(`${environment.apiUrl}/patients/add`, body)
    }
}