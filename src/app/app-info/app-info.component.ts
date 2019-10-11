import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

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
  constructor(private route: Router, private _bottomSheetRef: MatBottomSheetRef<AppInfoComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
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
    console.log('install clicked', id);
    if (id == 2) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/fitnessTracker/fitbit')
    } else if (id == 3) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/dashboard')
    } else if (id == 4) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/healthKnowledgeBase')
    } else if (id == 5) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/calendar')
    } else if (id == 7) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/medication')
    }
    this.install = !this.install
  }
  uninstallApp(id) {
    console.log('uninstall clicked');
    this.install = !this.install
  }
}
