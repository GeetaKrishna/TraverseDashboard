import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EhrService {

  constructor(private http: HttpClient) { }

getDocuments(){
  return this.http.get(`${environment.apiUrl}/document`)
 }
 
 getDocumentsByType(doc_type){
  return this.http.get(`${environment.apiUrl}/ehr/records/p/${parseInt(localStorage.getItem("patientId"))}/${doc_type}`)
 }

 addDocuments(body, DocumentType, description){
   console.log(body.files);
   return this.http.post(`${environment.apiUrl}/ehr/records/uploadFile/${parseInt(localStorage.getItem("patientId"))}/${DocumentType}/${description}`, body)
  //  return this.http.post(`${environment.apiUrl}/ehr/records/uploadFile/${parseInt(localStorage.getItem("patientId"))}/${DocumentType}`, body)
 }

// ${environment.apiUrl}/ehr/records/localStorage.getItem("Id") --> Delete API, delete httpmethod

}
