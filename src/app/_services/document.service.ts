import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

getDocuments(){
 return this.http.get(`${environment.localURL}/document`)
}

getDocumentsByType(doc_type){
 return this.http.get(`${environment.localURL}/document/${doc_type}`)
}
addDocuments(body){
  return this.http.post(`${environment.apiUrl}/uploadFile`, body)
}

}
