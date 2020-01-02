import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { AddPatientComponent } from '../header/header.component';
import { ForgotPasswordPage3Component } from '../forgot-password-page3/forgot-password-page3.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authentication: AuthenticationService, public dialog: MatDialog, private elementRef: ElementRef) { }

  ngOnInit() {
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

}
