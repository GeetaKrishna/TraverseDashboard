import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
    templateUrl: 'login.component.html',
    selector: 'app-login',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    loginSuccess: boolean = false;
    error = '';
    emailFormControl = new FormControl('', [
        Validators.required,
    ]);
    passwordFormControl = new FormControl('', [
        Validators.required,
    ]);
    loginData: { "fname": string; "id": number; "lname": string; "passowrd": string; "password": string; "role": string; "roles": string; "username": string; };
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public jwtHelper: JwtHelperService,
        private matDialog: MatDialog
    ) {

    }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit(event) {
        this.loginSuccess = true
        event.preventDefault();

        console.log(this.emailFormControl.value);
        console.log(this.passwordFormControl.value);

        this.submitted = true;
        // this.router.navigate(['admin/landing'])

        // stop here if form is invalid

        // if (this.loginForm.invalid) {
        //     return;
        // }

        // this.loading = true;

        console.log('inside login');


        this.authenticationService.login(this.emailFormControl.value, this.passwordFormControl.value)
            .subscribe(
                user => {
                    if (user.headers.get('authorization')) {
                        console.log(user.headers.get('authorization'))
                    }
                    this.loginSuccess = false;
                    console.log(user, "test");
                    this.authenticationService.getUserId(localStorage.getItem('userName')).subscribe((data) => {
                        console.log(data);
                        localStorage.setItem('userId', data['userId'])
                        data['password'] = undefined;
                        localStorage.setItem('loggedInUser', JSON.stringify(data))
                        this.loginSuccess = false;
                        this.authenticationService.getPatientByUserId(localStorage.getItem('userId')).subscribe((patientData) => {
                            console.log(patientData);
                            localStorage.setItem('patientId', patientData['pid'])
                            this.router.navigate(['admin/landing'])
                        })

                    })
                },
                error => {
                    console.log(error.status);
                    this.loginSuccess = false;
                });

    }

    forgotPassword() {
        this.matDialog.open(ForgotPasswordComponent);
    }

    signup() {
        console.log('heloo');
        this.router.navigateByUrl('signUp');
    }
}