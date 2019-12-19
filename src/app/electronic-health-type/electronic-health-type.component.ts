import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ActivatedRoute } from '@angular/router';
import { EhrService } from '../_services/ehr.service';
import { FormControl } from '@angular/forms';

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
  findType = new FormControl('');
  constructor(public ehrService: EhrService, public activatedRoute: ActivatedRoute) { }
  state;
  ngOnInit() {
    this.availableDocsForVisits = [];
    this.availableDocsForImaging = [];
    this.availableDocsForLabs = [];
    this.availableDocsForRecords = [];

    // this.ehrService.getDocuments().subscribe((data) => {
    //   console.log(data);
    // }, (err) => {
    //   console.log(err);
    // })

    // })
    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data['params']['id'])
      this.availableDocsForVisits = [];
      this.availableDocsForImaging = [];
      this.availableDocsForLabs = [];
      this.availableDocsForRecords = [];
      this.state = data['params']['id']
      this.ehrService.getDocumentsByType(data['params']['id']).subscribe((document) => {
        console.log(document)
        switch (this.state) {
          case 'Visits': {
            this.availableDocsForVisits = this.availableDocsForVisits.concat(document)
            console.log(this.availableDocsForVisits, 'i');
            break;
          }
          case 'Imaging': {
            this.availableDocsForImaging = this.availableDocsForImaging.concat(document)
            console.log(this.availableDocsForImaging, 'f');
            break;
          }
          case 'Labs': {
            this.availableDocsForLabs = this.availableDocsForLabs.concat(document)
            console.log(this.availableDocsForLabs, 't');
            break;
          }
          default: {
            this.availableDocsForRecords = this.availableDocsForRecords.concat(document)
            console.log(this.availableDocsForRecords, 'p');
            break;
          }
        }
      })
    });
  }

  findSearch() {
    console.log('findSearch', this.findType.value);
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
          this.ehrService.addDocuments(formData, type).subscribe((data) => {
            console.log(data);
            data['fileName'] = data['fileName']
            switch (type) {
              case 'Visits':
                this.availableDocsForVisits.push(data)
                //formdata
                break;
              case 'Imaging':
                this.availableDocsForImaging.push(data);
                break;
              case 'Labs':
                this.availableDocsForLabs.push(data);
                break;
              default:
                this.availableDocsForRecords.push(data)
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
      case 'Visits': {
        this.addDocToDB('Visits')
        break;
      }
      case 'Imaging': {
        this.addDocToDB('Imaging')
        break;
      }
      case 'Labs': {
        this.addDocToDB('Labs')
        break;
      }
      default: {
        this.addDocToDB('Records')
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
