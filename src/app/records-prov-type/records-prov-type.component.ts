import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DocumentService } from '../_services/document.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-records-prov-type',
  templateUrl: './records-prov-type.component.html',
  styleUrls: ['./records-prov-type.component.css']
})
export class RecordsProvTypeComponent implements OnInit {
  availableDocs = [];
  availableDocsForVisits = [];
  availableDocsForImaging = [];
  availableDocsForLabs = [];
  availableDocsForRecords = [];
  findType = new FormControl('')
  constructor(private docService: DocumentService, public activatedRoute: ActivatedRoute) { }
  state;
  ngOnInit() {
    this.availableDocsForVisits = [];
    this.availableDocsForImaging = [];
    this.availableDocsForLabs = [];
    this.availableDocsForRecords = [];

    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data['params']['id'])
      this.availableDocsForVisits = [];
      this.availableDocsForImaging = [];
      this.availableDocsForLabs = [];
      this.availableDocsForRecords = [];
      this.state = data['params']['id']

    });
  }

  findSearch() {
    console.log(this.findType.value, ' clicked');

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

  }
  deleteFile(file) {
    this.files.splice(file, 1)
  }

}
