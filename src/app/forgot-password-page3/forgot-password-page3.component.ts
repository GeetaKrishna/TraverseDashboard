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
  hide = true;
  cfhide = true;
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(16),
    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  ]);
  cfpasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.passwordFormControl.value)
  ]);
  constructor(private matDialog: MatDialog,
    private router: Router, private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // For Checking the Password and Confirm Password Validation
    this.cfpasswordFormControl.valueChanges.subscribe((data) => {
      if (this.passwordFormControl.value == this.cfpasswordFormControl.value) {
      } else {
        this.cfpasswordFormControl.setErrors({ notSame: true })
        if (this.cfpasswordFormControl.value == '') {
          this.cfpasswordFormControl.setErrors({ notSame: true, required: true })
        }
      }
    })

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
