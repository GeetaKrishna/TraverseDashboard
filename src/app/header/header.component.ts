import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ForgotPasswordPage3Component } from '../forgot-password-page3/forgot-password-page3.component';
import { ProfileComponent } from '../profile/profile.component';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  imageUrl: string;
  subscription: Subscription;

  constructor(private elementRef: ElementRef, private router: Router, private authentication: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.authentication.profImg$.subscribe((data) => {
      console.log(data, 'subscriptionData');
      if (data == 1) {
        this.imageUrl = '../../assets/newProfhead3.png'
      } else if (data == 2) {
        this.imageUrl = '../../assets/headFemale.png'
      }
    })
    let userData = JSON.parse(localStorage.getItem('loggedInUser'))
    console.log(userData.gender, 'gender');
    if (userData.gender == 'male') {
      this.imageUrl = '../../assets/newProfhead3.png'
    } else {
      this.imageUrl = '../../assets/headFemale.png'
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  changePassword() {
    this.authentication.testHTML("Password");
  }

  addPatientProfile(param): void {
    this.authentication.testHTML("Setting");
    // let component;
    // console.log(param);
    // if (param == 'patient') {
    //   component = AddPatientComponent;
    // }
    // else {
    //   component = ForgotPasswordPage3Component;
    // }
    // const dialogRef = this.dialog.open(component, {
    //   width: '480px',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  backGroundImageChange(k) {
    this.authentication.testHTML("close");
    console.log(k.files[0])
    var t = this.elementRef;
    var reader = new FileReader();
    reader.onload = function (e) {
      t.nativeElement.ownerDocument.body.style.backgroundImage = 'url(' + reader.result + ')'
    }
    reader.readAsDataURL(k.files[0]);//attempts to read the file in question.
    console.log(localStorage)
  }
  mouseEnter(str) {
    // console.log(str);
    this.closeAllToggles()
  }
  mouseLeave(str) {
    // console.log(str);
    this.authentication.toggleEmit('close');
  }
  closeAllToggles() {
    this.authentication.testHTML("SettingExpand");
    this.authentication.toggleEmit('close');
  }

  patientList() {
    this.authentication.testHTML("PatientList");
  }

  viewProfile() {
    console.log('write the code here to view Profile()');
    // this.authentication.toggleEmit('close');
    this.authentication.testHTML("Profile");
    // this.dialog.open(ProfileComponent, {
    //   // width: '600px',
    //   // position: {
    //   //   top: '0px',
    //   //   right: '0px'
    //   // }
    // })
  }

  logOut() {
    this.authentication.testHTML("close");
    console.log('logged out');
    this.authentication.logout()
  }
}


// @Component({
//   selector: 'addPatient',
//   templateUrl: 'addPatient.html',
// })
// export class AddPatientComponent {

  // patientNameFormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // heightFormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // weightFormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // selected: any;

  // constructor(
  //   private userService: UserService,
  //   public dialogRef: MatDialogRef<AddPatientComponent>) { }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  // changeRelation(relation) {
  //   console.log(relation, this.selected)
  // }
  // patientProfile(patientName, height, weight) {
  //   console.log(patientName, height, weight);
  //   console.log(this.selected)

  //   this.userService.registerPatient({
  //     "height": parseFloat(height.value),
  //     "patientName": patientName.value,
  //     "relation": this.selected,
  //     "userId": localStorage.getItem("userId"),
  //     "weight": parseFloat(weight.value)
  //   }).subscribe((data) => {
  //     console.log(data, "data during patient registration");
  //   }, (err) => {
  //     console.log(err, "error during patient registration");
  //   })
  // }
// }
