import { Component, OnInit, } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DocumentService } from '../_services/document.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

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
  description = '';
  findType = new FormControl('');
  state;

  constructor(private docService: DocumentService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.availableDocsForFamily = []
    this.availableDocsForTravel = []
    this.availableDocsForPersonal = []
    this.availableDocsForInsurance = []

    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data['params']['id'])
      this.availableDocsForFamily = []
      this.availableDocsForTravel = []
      this.availableDocsForPersonal = []
      this.availableDocsForInsurance = []
      this.state = data['params']['id']
      this.docService.getDocumentsByType(data['params']['id']).subscribe((document) => {
        console.log(document);
        switch (this.state) {
          case 'Insurance': {
            this.availableDocsForInsurance = this.availableDocsForInsurance.concat(document)
            console.log(this.availableDocsForInsurance, 'i');
            break;
          }
          case 'Family': {
            this.availableDocsForFamily = this.availableDocsForFamily.concat(document)
            console.log(this.availableDocsForFamily, 'f');
            break;
          }
          case 'Travel': {
            this.availableDocsForTravel = this.availableDocsForTravel.concat(document)
            console.log(this.availableDocsForTravel, 't');
            break;
          }
          default: {
            this.availableDocsForPersonal = this.availableDocsForPersonal.concat(document)
            console.log(this.availableDocsForPersonal, 'p');
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
  }

  fileOver(event) {
    console.log(event, 'over');
  }

  fileLeave(event) {
    console.log(event, 'leave');
  }
  dropZoneClassName: string = 'dropZone';

  addDocToDB(type) {

    console.log(this.files, "this fi;les");

    for (const droppedFile of this.files) {
      // Is it a file?

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        console.log(fileEntry, "this dropped fi;les");
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          const formData = new FormData()
          formData.append('file', file, droppedFile.relativePath)

          // api call
          this.docService.addDocuments(formData, type, this.description).subscribe((data) => {
            console.log(data);
            this.description = '';
            data['file_name'] = data['fileName']
            switch (type) {
              case 'Insurance':
                this.availableDocsForInsurance.push(data)
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

    switch (state) {
      case 'Insurance': {
        this.addDocToDB('Insurance')
        break;
      }
      case 'Family': {
        this.addDocToDB('Family')
        break;
      }
      case 'Travel': {
        this.addDocToDB('Travel')
        break;
      }
      default: {
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
