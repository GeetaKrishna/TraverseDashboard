import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private matDialog: MatDialog, private route: Router) { }

  emailFormControl = new FormControl('', Validators.required);

  ngOnInit() {
  }

  onSubmit(event) {
    console.log(event);
    this.route.navigateByUrl('pinPage')
  }

  cancel() {
    // this.matDialog.closeAll();
    this.route.navigateByUrl('/')
  }

}
