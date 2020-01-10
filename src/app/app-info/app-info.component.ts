import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { GetAppsService } from '../_services/get-apps.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { DashboardService } from '../_services/dashboard.service';

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
  constructor(private route: Router, private dashboardService: DashboardService,
    private toast: ToastrService, private getApp: GetAppsService,
    private _bottomSheetRef: MatBottomSheetRef<AppInfoComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
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
    if (id == 11) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/fitnessTracker/fitbit')
    } else if (id == 1) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/dashboard')
    } else if (id == 8) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/healthKnowledgeBase/healthKnowledgeContent')
    } else if (id == 4) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/calendar')
    } else if (id == 3) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/myHeart')
    } else if (id == 2) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/medication')
    } else if (id == 5) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/document/Personal')
    } else if (id == 12) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/healthconnect')
    } else if (id == 10) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/insurance')
    } else if (id == 6) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/electronicHealth/Visits')
    } else if (id == 16) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/pharmacy')
    } else if (id == 14) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/labReports/Labs')
    } else if (id == 13) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/patientView')
    } else if (id == 15) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/patientBilling')
    } else if (id == 17) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/recordsProvider/Visits')
    } else if (id == 19) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/emergency')
    } else if (id == 7) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/family')
    } else if (id == 9) {
      this._bottomSheetRef.dismiss();
      this.route.navigateByUrl('admin/medicalCondition')
    }
  }

  installApp(id, appDetails) {
    console.log('install clicked', id);
    console.log('install clicked', appDetails);
    this.stopInstall = true;

    if (id == 11) {
      this.Install(id, 'admin/fitnessTracker/fitbit')
    } else if (id == 1) {
      let cholesterol =
      {
        chLevel: this.cholesterolFormControl.value,
        clDate: new Date().toISOString(),
        modifiedBy: parseInt(localStorage.getItem("userId")),
        pid: localStorage.getItem("patientId")
      };
      let weight =
      {
        "pid": localStorage.getItem("patientId"),
        "weight": this.weightFormControl.value,
        modifiedBy: parseInt(localStorage.getItem("userId")),
        "weightDate": new Date().toISOString()
      }
      let glucose =
      {
        glDate: new Date().toISOString(),
        glucoseLevel: this.glucoseFormControl.value,
        modifiedBy: parseInt(localStorage.getItem("userId")),
        pid: localStorage.getItem("patientId")
      }
      let bp =
      {
        pid: parseInt(localStorage.getItem("patientId")),
        highBP: parseInt(this.highBPFormControl.value),
        lowBP: parseInt(this.lowBPFormControl.value),
        modifiedBy: parseInt(localStorage.getItem("userId")),
        bpDate: new Date().toISOString()
      }

      this.dashboardService.postWeight(weight).subscribe((data) => {

        this.dashboardService.sendCholesterol(cholesterol).subscribe((data) => {

          this.dashboardService.postBloodPressure(bp).subscribe((data) => {

            this.dashboardService.sendGlucose(glucose).subscribe((data) => {
              this.Install(id, 'admin/dashboard')
            })
          })
        })

      }, (err) => {

      })
    } else if (id == 8) {
      this.Install(id, 'admin/healthKnowledgeBase/healthKnowledgeContent')
    } else if (id == 4) {
      this.Install(id, 'admin/calendar')
    } else if (id == 3) {
      this.Install(id, 'admin/myHeart')
    } else if (id == 2) {
      this.Install(id, 'admin/medication')
    } else if (id == 5) {
      this.Install(id, 'admin/document/Personal')
    } else if (id == 12) {
      this.Install(id, 'admin/healthconnect')
    } else if (id == 10) {
      this.Install(id, 'admin/insurance')
    } else if (id == 6) {
      this.Install(id, 'admin/electronicHealth/Visits')
    } else if (id == 16) {
      this.Install(id, 'admin/pharmacy')
    } else if (id == 14) {
      this.Install(id, 'admin/labReports/Labs')
    } else if (id == 13) {
      this.Install(id, 'admin/patientView')
    } else if (id == 15) {
      this.Install(id, 'admin/patientBilling')

    } else if (id == 17) {
      this.Install(id, 'admin/recordsProvider/Visits')

    } else if (id == 19) {
      this.Install(id, 'admin/emergency')

    } else if (id == 7) {
      this.Install(id, 'admin/family')

    } else if (id == 9) {
      this.Install(id, 'admin/medicalCondition')
    }

  }

  Install(id, url) {
    this.getApp.addApp(id).subscribe((data) => {
      console.log(data)
      this._bottomSheetRef.dismiss();
      this.toast.success('App installed Successfully.')
      this.stopInstall = false;
      this.route.navigateByUrl(url)
    }, (error) => {
      this.toast.error(`Could'nt install app, Please try later.`)
      this.stopInstall = false;
      console.log(error, "error storing data")
    })
  }


  uninstallApp(id) {
    console.log(id);

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
