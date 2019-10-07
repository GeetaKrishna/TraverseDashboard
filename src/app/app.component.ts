import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';
  show: boolean;
  constructor(private route: Router) {

    console.log(this.route.url,window.location, 'route');
    if (window.location.pathname == '/' || window.location.pathname == '/signUp') {
      console.log('yooooooo');
      this.show = true;

    } else{
      this.show = false
    }

  }
  ngOnInit(){
    
  }

}
