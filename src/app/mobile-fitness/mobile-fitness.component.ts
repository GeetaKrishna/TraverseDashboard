import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-fitness',
  templateUrl: './mobile-fitness.component.html',
  styleUrls: ['./mobile-fitness.component.css']
})
export class MobileFitnessComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  apps: any[] = [
    {
      "appId": 1,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "FitBit",
      "url": "assets/newfitbit.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'fitbit'
    },
    {
      "appId": 2,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "Strava",
      "url": "assets/newstrava.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'fitbit'
    },
    {
      "appId": 3,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "Garmin",
      "url": "assets/newGarmin.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'fitbit'
    },
    {
      "appId": 4,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "Sleep Cycle",
      "url": "assets/newSleepcycle.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'fitbit'
    },
  ]

  openAppInfo(app){
    console.log('app', app);
    this.route.navigateByUrl('admin/fitnessTracker/' + app.routeScreen)
    console.log('openAppInfo() clicked', app["appId"]);   
  }

}
