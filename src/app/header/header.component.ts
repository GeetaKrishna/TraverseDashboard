import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ForgotPasswordPage3Component } from '../forgot-password-page3/forgot-password-page3.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(private elementRef: ElementRef, private router: Router,
    private authentication: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(param): void {
    let component;
    if (param == 'patient') {
      component = AddPatientComponent;
    }
    else {
      component = ForgotPasswordPage3Component;
    }
    const dialogRef = this.dialog.open(component, {
      width: '480px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

  viewProfile() {
    console.log('write the code here to view Profile()');
    this.dialog.open(ProfileComponent, {
      width: '600px',
      position: {
        top: '0px',
        right: '0px'
      }
    })
  }

  logOut() {
    console.log('logged out');
    this.authentication.logout()
  }
}


@Component({
  selector: 'addPatient',
  templateUrl: 'addPatient.html',
})
export class AddPatientComponent {

  patientNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  heightFormControl = new FormControl('', [
    Validators.required,
  ]);
  weightFormControl = new FormControl('', [
    Validators.required,
  ]);
  selected: any;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<AddPatientComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  changeRelation(relation) {
    console.log(relation, this.selected)
  }
  patientProfile(patientName, height, weight) {
    console.log(patientName, height, weight);
    console.log(this.selected)
    // let body = new FormData()
    // body.append('height', height.value)
    // body.append('weight', weight.value)
    // body.append('patientName', patientName.value)
    // body.append('relation', this.selected)
    // body.append(userId, height.value)

    this.userService.registerPatient({
      "height": parseFloat(height.value),
      "patientName": patientName.value,
      "relation": this.selected,
      "userId": localStorage.getItem("userId"),
      "weight": parseFloat(weight.value)
    }).subscribe((data) => {
      console.log(data, "data during patient registration");
    }, (err) => {
      console.log(err, "error during patient registration");
    })
  }
}
