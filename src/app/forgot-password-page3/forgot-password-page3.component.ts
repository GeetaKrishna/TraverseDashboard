import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password-page3',
  templateUrl: './forgot-password-page3.component.html',
  styleUrls: ['./forgot-password-page3.component.css']
})
export class ForgotPasswordPage3Component implements OnInit {
  constructor(private matDialog: MatDialog, private route: Router) { }

  passwordFormControl = new FormControl('', Validators.required);
  cfpasswordFormControl = new FormControl('', Validators.required);

  ngOnInit() {
  }

  onSubmit(event) {
    console.log(this.passwordFormControl.value, 'passwordFormControl');
    console.log(this.cfpasswordFormControl.value, 'cfpasswordFormControl');
    this.route.navigateByUrl('/')

    console.log(event);
  }

  cancel() {
    // this.matDialog.closeAll();
    this.route.navigateByUrl('/')
  }

}
