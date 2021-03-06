import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import * as _moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../register/register.component';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
const moment = _moment;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ProfileComponent implements OnInit {
  selectedGender: any;
  selectedRole: any;
  firstNameFormControl: any = new FormControl();
  lastNameFormControl: any = new FormControl();
  user: any;
  patient: any;
  ProfileNumber: number;

  constructor(private toast: ToastrService, private authentication: AuthenticationService, private userService: UserService) { }

  emailFormControl = new FormControl();
  userNameFormControl = new FormControl();
  numberFormControl = new FormControl();
  dateFormControl = new FormControl(moment().format('MM/DD/YYYY'));
  heightFormControl = new FormControl();
  weightFormControl = new FormControl();

  ngOnInit() {
    console.log('ssssss');
    console.log(localStorage.getItem("loggedInUser"))
    this.user = JSON.parse(localStorage.getItem("loggedInUser"));
    this.patient = JSON.parse(localStorage.getItem("patientData"));
    
    this.emailFormControl.setValue(this.user.email);
    this.userNameFormControl.setValue(this.user.userName); //ReadOnly
    this.firstNameFormControl.setValue(this.user.firstName); //
    this.lastNameFormControl.setValue(this.user.lastName); //
    this.numberFormControl.setValue(this.user.phoneNumber);
    this.dateFormControl.setValue(this.user.dob);
    this.selectedGender = this.user.gender;
    this.selectedRole = this.user.role;
    this.heightFormControl.setValue(this.patient.height);
    this.weightFormControl.setValue(this.patient.weight);
  }
  emailValidation(value) {
    console.log(value);
  }

  userNameValidation(value) {
    console.log(value);
  }

  dateInput(value) {
    console.log(value);
  }

  changeGender(value) {
    console.log(value);
  }

  changeClient(value) {
    console.log(value);
  }

  updateProfile() {
    //for [patient/family data]
    let updatePatientData = {
      "userId": parseInt(this.patient.userId),
      "pid": parseInt(this.patient.pid),
      "relation": this.patient.relation,
      "gender": this.selectedGender,
      "patientName": this.firstNameFormControl.value + " " + this.lastNameFormControl.value,
      "height": this.heightFormControl.value,
      "weight": this.weightFormControl.value
    }
    console.log(this.dateFormControl.value);

    //for user data
    let updateUserData = {
      "userId": parseInt(this.user.userId),
      "dob": this.dateFormControl.value,
      "email": this.emailFormControl.value,
      "firstName": this.firstNameFormControl.value,
      "gender": this.selectedGender,
      "lastName": this.lastNameFormControl.value,
      "phoneNumber": this.numberFormControl.value,
      "role": this.selectedRole,
      "pin": 0,
      "userName": this.userNameFormControl.value
    }

    console.log(updatePatientData);
    console.log(updateUserData);

    if (this.selectedGender == 'male') {
      this.ProfileNumber = 1
    }
    else if (this.selectedGender == 'female') {
      this.ProfileNumber = 2
    }

    this.userService.updateUserProfileById(updateUserData).subscribe((userData) => {
      // ADD toast messsage to show it's updated or failed
      console.log(userData);
      this.userService.updatePatientProfile(updatePatientData).subscribe((patientData) => {
        console.log(patientData);
        localStorage.setItem("loggedInUser", JSON.stringify(updateUserData))
        localStorage.setItem("patientData", JSON.stringify(patientData))
        this.toast.success(userData)
        this.authentication.changeImage(this.ProfileNumber)
        this.authentication.toggleEmit('close');
      }, (err) => {
        console.log(err);
        this.toast.error(err.messsage)
      })
    }, (err) => {
      console.log(err);
      this.toast.error(err.messsage)

    })
  }
  // selectedNavItem(item: number) {
  //   console.log('selected nav item ' + item);
  //   this._navService.changeNav(item);
  // }
  cancelEdit() {
    this.authentication.toggleEmit('close');
  }
}
