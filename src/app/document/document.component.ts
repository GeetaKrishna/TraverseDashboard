import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DocumentService } from '../_services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  availableDocs = [];

  constructor(private docService: DocumentService) { }

  ngOnInit() {

    // this.docService.getDocuments().subscribe((data) => {
    //   console.log(data['recordset'])
    //   this.availableDocs.push(data['recordset'][0])
    //   console.log(this.availableDocs);
      
    // }, (err) => {
    //   console.log(err);
    // })


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
    console.log(this.files);

  }

  fileOver(event) {
    console.log(event, 'over');
  }

  fileLeave(event) {
    console.log(event, 'leave');
  }
  dropZoneClassName: string = 'dropZone';
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

  getFileByType(type) {
    this.docService.getDocumentsByType(type).subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    })
  }
}
