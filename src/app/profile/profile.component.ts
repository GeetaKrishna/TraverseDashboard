import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  emailFormControl = new FormControl();
  userNameFormControl = new FormControl();
  numberFormControl = new FormControl();
  dateFormControl = new FormControl();
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
