import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  url = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getPlans(){
    return this.http.get(this.url + '/plans');
  }

  getClaims(){
    return this.http.get(this.url + '/claims');
  }
}
