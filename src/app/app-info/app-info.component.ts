import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { GetAppsService } from '../_services/get-apps.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {
  install: boolean = false
  app;
  appsToBePushed = [];
  stopInstall = false;
  weightFormControl = new FormControl('', [
    Validators.required,
  ]);
  cholesterolFormControl = new FormControl('', [
    Validators.required,
  ]);
  glucoseFormControl = new FormControl('', [
    Validators.required,
  ]);
  highBPFormControl = new FormControl('', [
    Validators.required,
  ]);
  lowBPFormControl = new FormControl('', [
    Validators.required,
  ]);
  ngOnInit() {
  }
  constructor(private route: Router, private toast: ToastrService, private getApp: GetAppsService, private _bottomSheetRef: MatBottomSheetRef<AppInfoComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
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


  navigateToApp(id) {
    if (id == 1) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/fitnessTracker/fitbit')
    } else if (id == 2) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/dashboard')
    } else if (id == 3) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/healthKnowledgeBase/healthKnowledgeContent')
    } else if (id == 4) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/calendar')
    } else if (id == 6) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/medication')
    } else if (id == 7) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/document')
    } else if (id == 10) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/electronicHealth/Visits')
    } else if (id == 16) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/pharmacy')
    } else if (id == 13) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/labReports/Labs')
    } else if (id == 14) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/patientView')
    } else if (id == 15) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/patientBilling')
    } else if (id == 19) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/emergency')
    } else if (id == 11) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/family')
    } else if (id == 12) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/medicalCondition')
    }
  }

  installApp(id, appDetails) {
    console.log('install clicked', id);
    console.log('install clicked', appDetails);
    this.stopInstall = true;
    this.getApp.addApp(id).subscribe((data) => {
      console.log(data)
      if (id == 1) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/fitnessTracker/fitbit')
      } else if (id == 2) {
        this._bottomSheetRef.dismiss();


        
        this.route.navigateByUrl('admin/dashboard')
      } else if (id == 3) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/healthKnowledgeBase/healthKnowledgeContent')
      } else if (id == 4) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/calendar')
      } else if (id == 6) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/medication')
      } else if (id == 7) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/document')
      } else if (id == 10) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/electronicHealth/Visits')
      } else if (id == 16) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/pharmacy')
      } else if (id == 13) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/labReports/Labs')
      } else if (id == 14) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/patientView')
      } else if (id == 15) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/patientBilling')
      } else if (id == 19) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/emergency')
      } else if (id == 11) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/family')
      } else if (id == 12) {
        this._bottomSheetRef.dismiss();
        this.route.navigateByUrl('admin/medicalCondition')
      }
      this.toast.success('App installed Successfully.')
      // if (JSON.parse(localStorage.getItem("apps"))) {
      //   if (JSON.parse(localStorage.getItem("apps")).length > 0) {
      //     console.log("inside")
      //     this.appsToBePushed = this.appsToBePushed.concat(JSON.parse(localStorage.getItem("apps")))
      //   }
      // }
      // this.appsToBePushed.push(this.data)
      // console.log(new Set(this.appsToBePushed));
      // localStorage.setItem('apps', JSON.stringify(this.appsToBePushed))
      this.stopInstall = false;
    }, (error) => {
      this.toast.error(`Could'nt install app, Please try later.`)
      this.stopInstall = false;
      console.log(error, "error storing data")
    })

  }

  uninstallApp(id) {
    this.getApp.deleteApp(id).subscribe((res) => {
      console.log(res);
      this.toast.success(`App uninstalled successfully.`)
      this._bottomSheetRef.dismiss({ data: id });
    }, (err) => {
      this.toast.error(`Couldn't uninstall app, Please try later.`)
      console.log(err);
    })
  }
}
