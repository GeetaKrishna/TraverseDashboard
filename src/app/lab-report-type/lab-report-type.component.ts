import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DocumentService } from '../_services/document.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-lab-report-type',
  templateUrl: './lab-report-type.component.html',
  styleUrls: ['./lab-report-type.component.css']
})
export class LabReportTypeComponent implements OnInit {

  availableDocs = [];
  availableDocsForMedicalRecords = [];
  availableDocsForImaging = [];
  availableDocsForLabs = [];
  availableDocsForMedications = [];
  constructor(private docService: DocumentService, public activatedRoute: ActivatedRoute) { }
  state;
  ngOnInit() {
    this.availableDocsForMedicalRecords = [];
    this.availableDocsForImaging = [];
    this.availableDocsForLabs = [];
    this.availableDocsForMedications = [];

    // this.docService.getDocuments().subscribe((data) => {
    //   console.log(data);
    // }, (err) => {
    //   console.log(err);
    // })

    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data['params']['id'])
      this.availableDocsForMedicalRecords = [];
      this.availableDocsForImaging = [];
      this.availableDocsForLabs = [];
      this.availableDocsForMedications = [];
      this.state = data['params']['id']
      this.docService.getDocumentsByType(data['params']['id']).subscribe((document) => {
        console.log(document['recordset'])
        switch (this.state) {
          case 'MedicalRecords': {
            this.availableDocsForMedicalRecords = this.availableDocsForMedicalRecords.concat(document['recordset'])
            console.log(this.availableDocsForMedicalRecords, 'i');
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
            this.availableDocsForMedications = this.availableDocsForMedications.concat(document['recordset'])
            console.log(this.availableDocsForMedications, 'p');
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

  addDocToDB(type) {
    for (const droppedFile of this.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          const formData = new FormData()
          formData.append('file', file, droppedFile.relativePath)
          // formData.append('doc_type', type)
          this.docService.addDocuments(formData, type).subscribe((data) => {
            console.log(data);
            data['file_name'] = data['fileName']
            switch (type) {
              case 'MedicalRecords':
                this.availableDocsForMedicalRecords.push(data)
                //formdata
                break;
              case 'Imaging':
                this.availableDocsForImaging.push(data);
                break;
              case 'Labs':
                this.availableDocsForLabs.push(data);
                break;
              default:
                this.availableDocsForMedications.push(data)
                break;
            }
            this.files.splice(this.files.indexOf(droppedFile), 1)
          }, (err) => {
            console.log(err);
          })
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  addRecord(state) {
    console.log('addRecord() clicked');
    // this.files.forEach((f, index) => {
    //   // console.log(f.relativePath);
    //   this.availableDocs.push(f)
    //   this.files.splice(index, 1)
    // });

    switch (state) {
      case 'MedicalRecords': {
        this.addDocToDB('MedicalRecords')
        break;
      }
      case 'Imaging': {
        this.addDocToDB('Imaging')
        break;
      }
      case 'Medications': {
        this.addDocToDB('Medications')
        break;
      }
      default: {
        this.addDocToDB('Labs')
        break;
      }
    }

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
