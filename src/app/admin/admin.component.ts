import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ForgotPasswordPage3Component } from '../forgot-password-page3/forgot-password-page3.component';
import { MatDialog } from '@angular/material';
import { AddPatientComponent } from '../add-patient/add-patient.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('profileMenu', { static: true }) profile;
  @ViewChild('settingMenu', { static: true }) setting;
  @ViewChild('settingExpandMenu', { static: true }) settingExpand;
  @ViewChild('passwordMenu', { static: true }) password;
  @ViewChild('patientListMenu', { static: true }) patientlist;
  addPatientButton: boolean;
  updatePatientButton: boolean;
  constructor(private authentication: AuthenticationService, public dialog: MatDialog, private elementRef: ElementRef) { }
  ngOnInit() {
    this.authentication.testEmitter.subscribe((data) => {
      console.log(data, "data from emitter");
     
      if (data == 'Profile') {
        this.profile.toggle();
        if (this.profile.opened) {
          this.setting.close();
          this.password.close();
          this.patientlist.close()
          this.settingExpand.close()
        }
      } else if (data == 'SettingExpand') {
        this.settingExpand.toggle();
        this.authentication.testHTML('setPatientButtonTrue');
        if (this.setting.opened) {
          this.profile.close();
          this.setting.close();
          this.password.close();
          this.patientlist.close();
        }
      } else if (data == 'Setting') {
        this.setting.toggle();
        this.authentication.testHTML('setPatientButtonTrue');
        if (this.setting.opened) {
          this.profile.close();
          this.settingExpand.close();
          this.password.close();
          this.patientlist.close();
        }
      } else if (data == 'Password') {
        this.password.toggle()
        if (this.password.opened) {
          this.setting.close();
          this.settingExpand.close()
          this.profile.close();
          this.patientlist.close()
        }
      } else if (data == 'PatientList') {
        this.patientlist.toggle()
        if (this.patientlist.opened) {
          this.profile.close();
          this.setting.close();
          this.settingExpand.close()
          this.password.close();
        }
      } else if (data["testData"] == 'editPatient') {
        this.authentication.testHTML('setUpdatePatientButtonTrue');
        this.setting.toggle()
        if (this.patientlist.opened) {
          this.profile.close();
          this.patientlist.close();
          this.password.close();
          this.patientlist.close();
        }
      }
    })
    this.authentication.toggleEmitter.subscribe((data) => {
      console.log(data, 'data');
      if (data == 'close') {
        this.setting.close();
        this.profile.close();
        this.password.close();
        this.patientlist.close();
      }
    })

  }
  backdropClicked() {
    this.setting.close();
    this.patientlist.close();
    this.profile.close();
    this.password.close();
  }

  viewProfile() {
    console.log('write the code here to view Profile()');
  }

  logOut() {
    console.log('logged out');
    this.authentication.logout()
  }

  openDialog(param): void {
    let component;
    if (param == 'patient') {
      component = AddPatientComponent;
    }
    else {
      component = ForgotPasswordPage3Component;
    }
  }

  backGroundImageChange(k) {
    console.log(k.files[0])
    var t = this.elementRef;
    var reader = new FileReader();
    reader.onload = function (e) {
      t.nativeElement.ownerDocument.body.style.backgroundImage = 'url(' + reader.result + ')'
    }
    reader.readAsDataURL(k.files[0]);//attempts to read the file in question.
    console.log(localStorage)
  }

}
