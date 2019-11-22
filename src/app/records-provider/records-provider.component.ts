import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-records-provider',
  templateUrl: './records-provider.component.html',
  styleUrls: ['./records-provider.component.css']
})
export class RecordsProviderComponent implements OnInit {

  availableDocs = [];

  constructor() { }
  ngOnInit() {
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



}
