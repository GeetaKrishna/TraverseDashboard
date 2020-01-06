import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.component.html',
  styleUrls: ['./setting-menu.component.css']
})
export class SettingMenuComponent implements OnInit {
  imgUrl: any;

  constructor(private authentication: AuthenticationService, private elementRef: ElementRef) { }

  ngOnInit() {
  }

  backGroundImageChange(k) {
    this.authentication.testHTML("close");

    // console.log(k.files[0])
    // var t = this.elementRef;
    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   t.nativeElement.ownerDocument.body.style.backgroundImage = 'url(' + reader.result + ')'
    // }
    // reader.readAsDataURL(k.files[0]);//attempts to read the file in question.
    // console.log(localStorage)
  }
  BGImageChange(img) {
    console.log(img);
    var reader = new FileReader();
    var t = this.elementRef;
    if (img == 'pink') {
      this.imgUrl = '../assets/newBG.png';
      // t.nativeElement.ownerDocument.body.style.backgroundImage =
    } else if (img == 'blue') {
      this.imgUrl = '../assets/newBG2.jpg';
    
    } else if (img == 'rainbow') {
      this.imgUrl = '../assets/wall2.jpg';
    }

    t.nativeElement.ownerDocument.body.style.backgroundImage = 'url(' + this.imgUrl + ')'

    // reader.onload = function (e) {
    //   t.nativeElement.ownerDocument.body.style.backgroundImage = 'url(' + reader.result + ')'
    // }
    // reader.readAsDataURL(k.files[0]);

  }
  changePassword() {
    this.authentication.testHTML("Password");
  }

  patientList() {
    this.authentication.testHTML("PatientList");
  }

  addPatientProfile(param): void {
    this.authentication.testHTML("Setting");

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
}
