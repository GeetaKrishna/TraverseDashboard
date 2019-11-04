import { Component, OnInit, } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DocumentService } from '../_services/document.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent implements OnInit {

  availableDocsForPersonal = [];
  availableDocsForInsurance = [];
  availableDocsForFamily = [];
  availableDocsForTravel = [];

  state;
  constructor(private docService: DocumentService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.availableDocsForFamily = []
    this.availableDocsForTravel = []
    this.availableDocsForPersonal = []
    this.availableDocsForInsurance = []
    // this.docService.getDocuments().subscribe((data) => {
    //   console.log(data['recordset'])
    //   this.availableDocs.push(data['recordset'][0])
    //   console.log(this.availableDocs);

    // }, (err) => {
    //   console.log(err);
    // })

    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data['params']['id'])
      this.availableDocsForFamily = []
      this.availableDocsForTravel = []
      this.availableDocsForPersonal = []
      this.availableDocsForInsurance = []
      this.state = data['params']['id']
      this.docService.getDocumentsByType(data['params']['id']).subscribe((document) => {
        console.log(document['recordset'])
        switch (this.state) {
          case 'Insurance': {
            this.availableDocsForInsurance = this.availableDocsForInsurance.concat(document['recordset'])
            console.log(this.availableDocsForInsurance, 'i');
            break;
          }
          case 'Family': {
            this.availableDocsForFamily = this.availableDocsForFamily.concat(document['recordset'])
            console.log(this.availableDocsForFamily, 'f');
            break;
          }
          case 'Travel': {
            this.availableDocsForTravel = this.availableDocsForTravel.concat(document['recordset'])
            console.log(this.availableDocsForTravel, 't');
            break;
          }
          default: {
            this.availableDocsForPersonal = this.availableDocsForPersonal.concat(document['recordset'])
            console.log(this.availableDocsForPersonal, 'p');
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
    // console.log(this.files);
  }

  fileOver(event) {
    console.log(event, 'over');
  }

  fileLeave(event) {
    console.log(event, 'leave');
  }
  dropZoneClassName: string = 'dropZone';

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
          formData.append('doc_type', type)
          this.docService.addDocuments(formData).subscribe((data) => {
            console.log(data);
            data['file_name'] = data['fileName']
            switch (type) {
              case 'Insurance':
                this.availableDocsForInsurance.push(data)
                //formdata
                break;
              case 'Family':
                this.availableDocsForFamily.push(data);
                break;
              case 'Travel': this.availableDocsForTravel.push(data);
                break;
              default:
                this.availableDocsForPersonal.push(data)
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
    console.log('addRecord() clicked', state);
    // this.files.forEach((f, index) => {
    //   // console.log(f.relativePath);
    //   // this.availableDocs.push(f)
    //   this.files.splice(index, 1)
    // });

    switch (state) {
      case 'Insurance': {
        // this.availableDocsForInsurance = this.availableDocsForInsurance.concat(document['recordset'])
        this.addDocToDB('Insurance')
        break;
      }
      case 'Family': {
        // this.availableDocsForFamily = this.availableDocsForFamily.concat(document['recordset'])
        // console.log(this.availableDocsForFamily, 'f');
        this.addDocToDB('Family')
        break;
      }
      case 'Travel': {
        // this.availableDocsForTravel = this.availableDocsForTravel.concat(document['recordset'])
        // console.log(this.availableDocsForTravel, 't');
        this.addDocToDB('Travel')
        break;
      }
      default: {
        // this.availableDocsForPersonal = this.availableDocsForPersonal.concat(document['recordset'])
        // console.log(this.availableDocsForPersonal, 'p');
        this.addDocToDB('Personal')
        break;
      }
    }
  }

  deleteFile(file) {
    this.files.splice(file, 1)
  }

  getFileByType(type) {
    this.docService.getDocumentsByType(type).subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    })
  }
}
