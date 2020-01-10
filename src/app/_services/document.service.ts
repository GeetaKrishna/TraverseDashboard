import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocuments() {
    return this.http.get(`${environment.apiUrl}/document`)
  }

  getDocumentsByType(doc_type) {
    return this.http.get(`${environment.apiUrl}/doc/records/p/${parseInt(localStorage.getItem("patientId"))}/${doc_type}`)
  }

  // /upload/{patientId}/{documentType}/{description}


  addDocuments(body, DocumentType, description) {
    console.log(body);
    return this.http.post(`${environment.apiUrl}/doc/records/uploadFile/${parseInt(localStorage.getItem("patientId"))}/${DocumentType}/${description}`, body)
    // return this.http.post(`${environment.apiUrl}/doc/records/uploadFile/${parseInt(localStorage.getItem("patientId"))}/${DocumentType}/${description}`, body)
  }

}
