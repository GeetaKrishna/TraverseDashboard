import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailTaken: boolean;
  refreshEmail: boolean = false;
  constructor(private matDialog: MatDialog, private route: Router, private authenticationService: AuthenticationService) { }

  emailFormControl = new FormControl('', Validators.required);

  ngOnInit() {
  }

  onSubmit(event) {
    console.log(event);
    this.refreshEmail = true;
    this.authenticationService.verifyMailId(this.emailFormControl.value).subscribe((data: boolean) => {
      console.log(data);
      this.refreshEmail = false;
      this.emailTaken = data;
      if (this.emailTaken == false) {

      }
      else {
        this.authenticationService.setPIN(this.emailFormControl.value).subscribe((pin) => {
          console.log(pin, "pin");

        }, (err) => {
          console.log(err, "error during getting pin");

        })
        this.route.navigate(['pinPage', { data: this.emailFormControl.value }])
      }

    }, (err) => {

    })
  }

  cancel() {
    // this.matDialog.closeAll();
    this.route.navigateByUrl('/login')
  }

}
