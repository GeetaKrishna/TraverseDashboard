import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {
  install: boolean = false
app;
  ngOnInit() {
  }
  constructor(private _bottomSheetRef: MatBottomSheetRef<AppInfoComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { 
    console.log(data, 'recievedData');
    this.app = data;
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  updateApp(id) {
    console.log('update clicked');
  }
  installApp(id) {
    console.log('install clicked');
    this.install = !this.install
  }
  uninstallApp(id) {
    console.log('uninstall clicked');
    this.install = !this.install
  }
}
