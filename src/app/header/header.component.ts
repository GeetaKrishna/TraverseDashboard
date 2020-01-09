import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MatDialog } from '@angular/material';
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
      // this is to modify gender of profile image
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
    // this is subscribed by testEmitter in admin.component and opens password component
    this.authentication.testHTML("Password");
  }

  addPatientProfile(param): void {
    // this is subscribed by testEmitter in admin.component and opens password component
    this.authentication.testHTML("Setting");
  }

  backGroundImageChange(k) {
    // this is subscribed by testEmitter in admin.component and opens password component
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
    // this is subscribed by testEmitter in admin.component and opens password component
    this.authentication.testHTML("Profile");

  }

  logOut() {
    this.authentication.testHTML("close");
    console.log('logged out');
    this.authentication.logout()
  }
}