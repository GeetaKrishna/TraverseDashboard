import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  cfpasswordFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      cfpassword: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.router.navigate(['login'])

    // stop here if form is invalid


    // if (this.loginForm.invalid) {
    //     return;
    // }

    // this.loading = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {https://github.com/TeamWertarbyte/material-ui-chip-input/blob/master/src/ChipInput.js
    //             this.error = error;
    //             this.loading = false;
    //         });
  }

}
