import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
// use Interface to reuse the code block
export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class RegisterComponent implements OnInit {
  subject: Subject<any> = new Subject();
  subjectEmail: Subject<any> = new Subject();
  signUpForm: FormGroup;
  signUpSuccess: boolean = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  refresh: boolean = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  // use updateOn for performance ;
  userNameFormControl = new FormControl('', {
    validators: Validators.required
  });

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  numberFormControl = new FormControl('', [
    Validators.required,
  ]);
  dateFormControl = new FormControl(moment().format('MM/DD/YYYY'), [
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
    Validators.minLength(8),
    Validators.maxLength(16),
    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  ]);
  cfpasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.passwordFormControl.value)
  ]);

  userNameTaken: any;
  usernameAvialable: boolean;
  emailTaken: boolean;
  refreshEmail: boolean;
  validPassword: boolean;
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
    this.userNameFormControl.valueChanges.subscribe((data) => {
      console.log(data);
      if (this.userNameTaken == true || this.userNameTaken == false) {
        this.userNameTaken = "True";
      }
      this.refresh = true;
    })

    this.emailFormControl.valueChanges.subscribe((data) => {
      console.log(data);
      if (this.emailTaken == true || this.emailTaken == false) {
        this.userNameTaken = "True";
      }
      this.refreshEmail = true;
    })

    this.subject
      .pipe(debounceTime(3000))
      .subscribe((k) => {
        console.log(k);
        this.refresh = false;
        this.authenticationService.verifyUserName(k).subscribe((data: boolean) => {
          console.log(data);
          this.userNameTaken = data;
        })
      })

    this.subjectEmail
      .pipe(debounceTime(3000))
      .subscribe((k) => {
        this.authenticationService.verifyMailId(k).subscribe((data: boolean) => {
          this.refreshEmail = false;
          console.log(data);
          this.emailTaken = data;
        })
      });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  selectedVal: String = ''
  selectedGender: String = ''
  selectedDate: String = ''

  userNameValidation(username) {
    console.log(username);
    this.refresh = true;
    this.subject.next(username);
  }

  emailValidation(email) {
    console.log(email);
    this.refreshEmail = true;
    this.subjectEmail.next(email);
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
    console.log(value);
    this.selectedDate = new Date(value).toLocaleDateString().split("/").reverse().join('-')
    console.log(this.selectedDate);
  }
  passwordValidation(pwd, cfpwd) {
    console.log(pwd, cfpwd, 'v');
    if (pwd == cfpwd) {
      console.log(true);
      this.validPassword = true;
    }
    // console.log(false);

    // this.validPassword = false
  }

  register(FNAME, LNAME, USERNAME, PHONENUMBER, EMAIL, PWD, HEIGHT, WEIGHT) {

    this.selectedDate = moment(this.dateFormControl.value).format('L').split("/").reverse().join('-')
    console.log(this.selectedDate);
    this.signUpSuccess = true;
    let registrationData = {
      "dob": this.selectedDate,
      "email": EMAIL.value,
      "firstName": FNAME.value,
      "gender": this.selectedGender,
      "lastName": LNAME.value,
      "password": PWD.value,
      "phoneNumber": PHONENUMBER.value,
      "role": this.selectedVal,
      "pin": 0,
      "userName": USERNAME.value
    }
    console.log(moment(this.dateFormControl.value).format('L'))


    console.log(registrationData, 'regDAta');

    this.registrationService.register(registrationData, HEIGHT.value, WEIGHT.value).subscribe((data) => {
      console.log(data);
      this.toast.success('Registration was Successful.')
      this.signUpSuccess = false
      this.router.navigateByUrl('/')
    }, (error) => {
      this.signUpSuccess = false;
    })
  }

}
