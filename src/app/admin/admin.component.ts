import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
// import { AddPatientComponent } from '../header/header.component';
import { ForgotPasswordPage3Component } from '../forgot-password-page3/forgot-password-page3.component';
import { MatDialog } from '@angular/material';
import { ProfileComponent } from '../profile/profile.component';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('profileMenu', { static: true }) profile;
  @ViewChild('settingMenu', { static: true }) setting;
  @ViewChild('passwordMenu', { static: true }) password;
  @ViewChild('', { static: true }) closeToggle;

  constructor(private authentication: AuthenticationService, public dialog: MatDialog, private elementRef: ElementRef) { }
  ngOnInit() {
    this.authentication.testEmitter.subscribe((data) => {
      console.log(data, "data from emitter");

      if (data == 'Profile') {
        this.profile.toggle();
        if (this.profile.opened) {
          this.setting.close();
          this.password.close();
        }

        console.log(this.profile.opened, 'logg');

      } else if (data == 'Setting') {
        this.setting.toggle();
        if (this.setting.opened) {
          this.profile.close();
          this.password.close();
        }
      } else if (data == 'Password') {
        this.password.toggle()
        if (this.password.opened) {
          this.setting.close()
          this.profile.close()
        }
      }
    })
    this.authentication.toggleEmitter.subscribe((data) => {
      console.log(data, 'data');
      if (data == 'close') {
        this.setting.close()
        this.profile.close()
        this.password.close()
      }
    })

  }
  backdropClicked() {
    this.setting.close();
    this.profile.close();
    this.password.close();
  }

  viewProfile() {
    console.log('write the code here to view Profile()');
  }

  logOut() {
    console.log('logged out');
    this.authentication.logout()
    // localStorage.clear()
    // this.router.navigateByUrl('/');
    // localStorage.clear()
    // // [routerLink]="['/']"
  }

  openDialog(param): void {
    let component;
    if (param == 'patient') {
      component = AddPatientComponent;
    }
    else {
      component = ForgotPasswordPage3Component;
    }
    // const dialogRef = this.dialog.open(component, {
    //   width: '480px',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
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
