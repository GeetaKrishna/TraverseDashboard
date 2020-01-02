import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-forgot-password-page3',
  templateUrl: './forgot-password-page3.component.html',
  styleUrls: ['./forgot-password-page3.component.css']
})
export class ForgotPasswordPage3Component implements OnInit {
  mailId: any;
  pin: string;
  constructor(private matDialog: MatDialog, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  passwordFormControl = new FormControl('', Validators.required);
  cfpasswordFormControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.mailId = this.route.snapshot.paramMap.get('data');
    this.pin = this.route.snapshot.paramMap.get('pin');
    console.log(this.mailId)
  }

  onSubmit(event) {

    this.authenticationService.updatePassword(
      { pin: this.pin, email: this.mailId, password: this.passwordFormControl.value }
    ).subscribe((data) => {
      console.log(data, "data after password submission");
      this.router.navigateByUrl('/')
    }, (err) => {
      console.log(err);
    })

    console.log(this.passwordFormControl.value, 'passwordFormControl');
    console.log(this.cfpasswordFormControl.value, 'cfpasswordFormControl');
    console.log(event);
  }

  cancel() {
    this.router.navigateByUrl('/')
  }

}
