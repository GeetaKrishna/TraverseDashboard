import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';

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
    error = '';
    emailFormControl = new FormControl('', [
        // Validators.required,
        // Validators.email,
    ]);
    passwordFormControl = new FormControl('', [
        // Validators.required,
    ]);
    loginData: { "fname": string; "id": number; "lname": string; "passowrd": string; "password": string; "role": string; "roles": string; "username": string; };
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
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        console.log(this.emailFormControl.value);
        console.log(this.passwordFormControl.value);

        this.submitted = true;
        // this.router.navigate(['admin/landing'])

        // stop here if form is invalid


        // if (this.loginForm.invalid) {
        //     return;
        // }

        // this.loading = true;
        // this.loginData = {
        //     "fname": "string",
        //     "id": 0,
        //     "lname": "string",
        //     "passowrd": "string",
        //     "password": "string",
        //     "role": "string",
        //     "roles": "string",
        //     "username": "string"
        // }
        this.authenticationService.login(this.emailFormControl.value, this.passwordFormControl.value)
            // .pipe(first())
            .subscribe(
                data => {
                    // this.router.navigate([this.returnUrl]);
                    this.router.navigate(['admin/landing'])
                    console.log(data);

                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}