import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

getDocuments(){
 return this.http.get(`${environment.apiUrl}/document`)
}

getDocumentsByType(doc_type){
 return this.http.get(`${environment.apiUrl}/doc/records/p/${parseInt(localStorage.getItem("patientId"))}/${doc_type}`)
}

addDocuments(body, DocumentType){
  console.log(body.files);
  // ?for health DocumentService, doc
  return this.http.post(`${environment.apiUrl}/doc/records/uploadFile/${parseInt(localStorage.getItem("patientId"))}/${DocumentType}`, body)
}

}
