import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';
  show: boolean;
  subscription: Subscription;
  // url: string = './../assets/newBG.png';
  url: string = 'src/assets/newBG.png';

  constructor(public router: Router, public route: ActivatedRoute, private authentication: AuthenticationService) {

  }
  ngOnInit() {
    console.log(this.url, 'url1');

    this.subscription = this.authentication.mainBGImage$.subscribe((data) => {
      console.log(data, 'subscriptionData');
      this.url = data
    })
    console.log(this.url, 'url2');

  }

  getUrl() {
    console.log(this.url, 'getUrl');
    return this.url;
  }


}
