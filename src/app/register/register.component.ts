import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  subject: Subject<any> = new Subject();
  signUpForm: FormGroup;
  signUpSuccess: boolean = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  userNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  numberFormControl = new FormControl('', [
    Validators.required,
  ]);
  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  heightFormControl = new FormControl('', [
    Validators.required,
  ]);
  weightFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  cfpasswordFormControl = new FormControl('', [
    Validators.required,
  ]);
  userNameTaken: boolean;
  usernameAvialable: boolean;
  constructor(
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private registrationService: UserService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // console.log('yo');
    // window.alert('helooo')
    this.signUpForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      cfpassword: ['', Validators.required]
    });

    this.subject
      .pipe(debounceTime(3000))
      .subscribe((k) => {
        console.log(k);
        this.authenticationService.verifyUserName(k).subscribe((data) => {
          let usernameTake: Boolean
          console.log(data);
          if (data) {
            this.usernameAvialable = true
            this.userNameTaken = false
          }
          else {
            this.usernameAvialable = false
            this.userNameTaken = true
          }
        })
        // let usernameTake: Boolean
        // if (k === "Geeta") {
        //   // usernameTake = true
        //   this.usernameAvialable = false
        //   this.userNameTaken = true
        //   console.log('this name exists, no API call', this.userNameTaken)
        // }
        // else {
        //   // usernameTake = false
        //   this.usernameAvialable = true
        //   this.userNameTaken = false
        //   console.log('API call')

        // }
        // api call for validation of username 

        // this.formGroup.controls.name.setValidators([ Validators.minLength(5) ]);
        // this.formGroup.controls.name.updateValueAndValidity();
      }
      );
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  selectedVal: String = ''
  selectedGender: String = ''
  selectedDate: String = ''

  userNameValidation(username) {
    console.log(username);
    this.subject.next(username);
  }

  changeClient(value) {
    this.selectedVal = value
    console.log(value);
  }

  changeGender(value) {
    this.selectedGender = value
    console.log(value);
  }
  dateInput(value) {
    console.log(this.dateFormControl.value);
    this.selectedDate = new Date(value).toLocaleDateString().split("/").reverse().join('-')
    console.log(this.selectedDate);
  }
  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
    // this.router.navigate(['login'])

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
    // },
    //         error => {https://github.com/TeamWertarbyte/material-ui-chip-input/blob/master/src/ChipInput.js
    //             this.error = error;
    //             this.loading = false;
    //         });
  }

  register(FNAME, LNAME, USERNAME, PHONENUMBER, EMAIL, PWD, HEIGHT, WEIGHT) {
    this.signUpSuccess = true;
    // console.log(FNAME.value, LNAME.value, USERNAME.value, EMAIL.value, PWD.value, this.selectedVal);
    let registrationData = {
      "dob": this.selectedDate,
      "email": EMAIL.value,
      "firstName": FNAME.value,
      "gender": this.selectedGender,
      "lastName": LNAME.value,
      "password": PWD.value,
      "phoneNumber": PHONENUMBER.value,
      "role": this.selectedVal,
      // "userId": 0,
      "userName": USERNAME.value
    }
    this.registrationService.register(registrationData, HEIGHT.value, WEIGHT.value).subscribe((data) => {
      console.log(data);
      this.toast.success('Registration was Successful.')
      this.signUpSuccess = false
      // this.router.navigateByUrl('/login')
    }, (error) => {
      this.signUpSuccess = false;
    })
  }

}
