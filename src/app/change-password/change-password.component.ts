import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  cfhide = true;
  user: any;

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
    this.cfpasswordFormControl.valueChanges.subscribe((data) => {
      if (this.passwordFormControl.value == this.cfpasswordFormControl.value) {
      } else {
        this.cfpasswordFormControl.setErrors({ notSame: true })
        if (this.cfpasswordFormControl.value == '') {
          this.cfpasswordFormControl.setErrors({ notSame: true, required: true })
        }
      }
    })
  }

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

  changePassword(password, cfpassword) {
    console.log(password);
    console.log(cfpassword);
    // API Code Here
    this.user = JSON.parse(localStorage.getItem("loggedInUser"));
    let userId = parseInt(localStorage.getItem('userId'))
    let email = this.user.email
    let newpassword = password

    this.authentication.changePassword(userId, email, newpassword).subscribe((data) => {
      console.log(data, "data after password submission");
      this.authentication.toggleEmit('close');
    }, (err) => {
      console.log(err);
    })

  }

  cancelEdit() {
    this.authentication.toggleEmit('close');
  }
}
