import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(private elementRef: ElementRef, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  backGroundImageChange(k) {
    console.log(k.files[0])
    var t = this.elementRef;
    var reader = new FileReader();
    reader.onload = function (e) {
      t.nativeElement.ownerDocument.body.style.backgroundImage = 'url(' + reader.result + ')'
    }

    reader.readAsDataURL(k.files[0]);//attempts to read the file in question.
    console.log(localStorage)
  }
  logOut() {
    console.log('logged out');
    this.authentication.logout()
    // localStorage.clear()
    // this.router.navigateByUrl('/');
    // localStorage.clear()
    // // [routerLink]="['/']"
  }
}
