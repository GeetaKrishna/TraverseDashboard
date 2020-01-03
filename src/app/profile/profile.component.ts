import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import * as _moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../register/register.component';
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

  constructor(private authentication: AuthenticationService) { }

  emailFormControl = new FormControl();
  userNameFormControl = new FormControl();
  numberFormControl = new FormControl();
  dateFormControl = new FormControl(moment().format('MM/DD/YYYY'));
  heightFormControl = new FormControl();
  weightFormControl = new FormControl();

  ngOnInit() {
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

  register(value) {
    console.log(value);
  }

  cancelEdit() {
    this.authentication.toggleEmit('close');
  }
}
