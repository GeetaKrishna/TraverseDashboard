import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-forgot-password-page2',
  templateUrl: './forgot-password-page2.component.html',
  styleUrls: ['./forgot-password-page2.component.css']
})
export class ForgotPasswordPage2Component implements OnInit {
  mailId: string;

  constructor(private matDialog: MatDialog, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  pinFormControl = new FormControl('', Validators.required);

  ngOnInit() {
    console.log(this.router.getCurrentNavigation(), 'extras');
    
    console.log(history.state, 'state');
    
    // this.mailId = this.route.snapshot.paramMap.get('data');
    this.mailId = history.state.data;
    console.log(this.mailId)
  }

  onSubmit(event) {
    console.log(this.pinFormControl.value, 'pin');

    this.authenticationService.verifyPIN(this.pinFormControl.value, this.mailId).subscribe((data: boolean) => {
      console.log(data);
      
      if (data == true) {
        this.router.navigate(['passwordChangePage'], {state:{data: this.mailId, pin: this.pinFormControl.value}})
      }
      else {
        //show an error, Invalid PIN
        alert("Invalid PIN")
      }
    }, (err) => {
      console.log(err);

    })


    console.log(event);
  }

  cancel() {
    this.router.navigateByUrl('/')
  }
}
