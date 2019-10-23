import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
let RegisterComponent = class RegisterComponent {
    constructor(formBuilder, route, router, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.submitted = false;
        this.error = '';
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.firstNameFormControl = new FormControl('', [
            Validators.required,
        ]);
        this.lastNameFormControl = new FormControl('', [
            Validators.required,
        ]);
        this.passwordFormControl = new FormControl('', [
            Validators.required,
        ]);
        this.cfpasswordFormControl = new FormControl('', [
            Validators.required,
        ]);
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
        this.router.navigate(['login']);
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
};
RegisterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map