import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page2',
  templateUrl: './forgot-password-page2.component.html',
  styleUrls: ['./forgot-password-page2.component.css']
})
export class ForgotPasswordPage2Component implements OnInit {

  constructor(private matDialog: MatDialog, private route: Router) { }

  pinFormControl = new FormControl('', Validators.required);

  ngOnInit() {
  }

  onSubmit(event) {
    console.log(this.pinFormControl.value, 'pin');
    this.route.navigateByUrl('/passwordChangePage')

    console.log(event);
  }

  cancel() {
    // this.matDialog.closeAll();
    this.route.navigateByUrl('/')
  }
}
