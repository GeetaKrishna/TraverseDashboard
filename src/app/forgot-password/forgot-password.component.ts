import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  emailFormControl = new FormControl();

  ngOnInit() {
  }

  onSubmit(event) {
    console.log(event);
  }

  cancel(){
    this.matDialog.closeAll();
  }

}
