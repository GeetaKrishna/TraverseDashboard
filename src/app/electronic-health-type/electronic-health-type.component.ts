import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DocumentService } from '../_services/document.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-electronic-health-type',
  templateUrl: './electronic-health-type.component.html',
  styleUrls: ['./electronic-health-type.component.css']
})
export class ElectronicHealthTypeComponent implements OnInit {
  availableDocs = [];
  availableDocsForVisits = [];
  availableDocsForImaging = [];
  availableDocsForLabs = [];
  availableDocsForRecords = [];
  constructor(private docService: DocumentService, public activatedRoute: ActivatedRoute) { }
  state;
  ngOnInit() {
    this.availableDocsForVisits = [];
    this.availableDocsForImaging = [];
    this.availableDocsForLabs = [];
    this.availableDocsForRecords = [];

    // this.docService.getDocuments().subscribe((data) => {
    //   console.log(data);

    // }, (err) => {
    //   console.log(err);

    // })

    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data['params']['id'])
      this.availableDocsForVisits = [];
      this.availableDocsForImaging = [];
      this.availableDocsForLabs = [];
      this.availableDocsForRecords = [];
      this.state = data['params']['id']
      this.docService.getDocumentsByType(data['params']['id']).subscribe((document) => {
        console.log(document['recordset'])
        switch (this.state) {
          case 'Visits': {
            this.availableDocsForVisits = this.availableDocsForVisits.concat(document['recordset'])
            console.log(this.availableDocsForVisits, 'i');
            break;
          }
          case 'Imaging': {
            this.availableDocsForImaging = this.availableDocsForImaging.concat(document['recordset'])
            console.log(this.availableDocsForImaging, 'f');
            break;
          }
          case 'Labs': {
            this.availableDocsForLabs = this.availableDocsForLabs.concat(document['recordset'])
            console.log(this.availableDocsForLabs, 't');
            break;
          }
          default: {
            this.availableDocsForRecords = this.availableDocsForRecords.concat(document['recordset'])
            console.log(this.availableDocsForRecords, 'p');
            break;
          }
        }
      })
    });
  }
  public files: NgxFileDropEntry[] = [];

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file, 'name');
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  fileOver(event) {
    console.log(event, 'over');
  }

  fileLeave(event) {
    console.log(event, 'leave');
  }
  addRecord() {
    console.log('addRecord() clicked');
    this.files.forEach((f, index) => {
      // console.log(f.relativePath);
      this.availableDocs.push(f)
      this.files.splice(index, 1)

    });

    /**  // You could upload it like this:
         const formData = new FormData()
         formData.append('logo', file, relativePath)
 
         // Headers
         const headers = new HttpHeaders({
           'security-token': 'mytoken'
         })
 
         this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
         .subscribe(data => {
           // Sanitized logo returned from backend
         })
         **/
  }
  deleteFile(file) {
    this.files.splice(file, 1)
  }


}
