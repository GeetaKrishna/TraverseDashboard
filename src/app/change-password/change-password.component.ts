import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  passwordFormControl = new FormControl('', Validators.required);
  cfpasswordFormControl = new FormControl('', Validators.required);

  changePassword(password, cfpassword) {
    console.log(password);
    console.log(cfpassword);
  }

  cancelEdit() {
    this.authentication.toggleEmit('close');
  }
}
