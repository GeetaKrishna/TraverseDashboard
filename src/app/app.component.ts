import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';
  show: boolean;
  constructor(public router: Router, public route: ActivatedRoute) {
    // router.events
    //   .filter(e => e instanceof NavigationEnd)
    //   .forEach(e => {
    //     this.title = route.root.firstChild.snapshot.data['PageName'];
    // });
  }
  ngOnInit() {
    // if (this.router.url == '/') {
    //   console.log('yooooooo');
    //   this.show = true;

    // } else {
    //   this.show = false
    // }
  }


}
