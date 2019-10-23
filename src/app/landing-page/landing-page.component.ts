import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { GetAppsService } from '../_services/get-apps.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @Input() test;
  images = ["assets/icons-home/motion01.png", "assets/icons-home/motion02.png", "assets/icons-home/motion03.png", "assets/icons-home/motion04.png", "assets/icons-home/motion05png", "assets/icons-home/motion06.png"];
  apps: any[] = [
    {
      "APPID": 1,
      "APPDETAILS": "This is App Store Logo",
      "VERSION": "1.0v",
      "APPNAME": "Store",
      "URL": "assets/storeLogo.png",
      "userTable": [],
      "RATING": 2.5,
      "ROUTESCREEN": 'admin/home'
    },
    // {
    //   "appId": 2,
    //   "appDetails": "This is Android",
    //   "version": "1.0v",
    //   "appName": "Fitness Tracker",
    //   "url": "assets/icons-home/motion02.png",
    //   "userTable": [],
    //   "rating": 2.5,
    //   "routeScreen": 'admin/fitnessTracker/fitbit'
    // },
    // {
    //   "appId": 3,
    //   "appDetails": "KEEPS TRACK OF WEIGHT, GLUCOSE LEVEL, ETC",
    //   "version": "1.0v",
    //   "appName": "Four Corners Of Health",
    //   "url": "assets/icons-home/motion01.png",
    //   "userTable": [],
    //   "rating": 3.5,
    //   "routeScreen": 'admin/dashboard'
    // },
    // {
    //   "appId": 4,
    //   "appDetails": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
    //   "version": "1.0v",
    //   "appName": "Health Knowledge Base",
    //   "url": "assets/icons-home/motion03.png",
    //   "userTable": [],
    //   "rating": 1.5,
    //   "routeScreen": 'admin/healthKnowledgeBase'
    // },
    // {
    //   "appId": 5,
    //   "appDetails": "KEEPS TRACK OF APPOITMENT",
    //   "version": "1.0v",
    //   "appName": "Calendar",
    //   "url": "assets/icons-home/calendar.jpg",
    //   "userTable": [],
    //   "rating": 4.5,
    //   "routeScreen": 'admin/calendar'
    // },
    // {
    //   "appId": 6,
    //   "appDetails": "HELPS TO TRACK INSURANCE DETAILS AND CLAIMS",
    //   "version": "1.0v",
    //   "appName": "My Heart",
    //   "url": "assets/myHeart/myHeartt.png",
    //   "userTable": [],
    //   "rating": 5,
    //   "routeScreen": 'admin/myHeart'
    // },
    // {
    //   "appId": 7,
    //   "appDetails": "For Medication details",
    //   "version": "1.0v",
    //   "appName": "Medications",
    //   "url": "assets/icons-home/motion07.png",
    //   "userTable": [],
    //   "rating": 5,
    //   "routeScreen": 'admin/medication'
    // },
    // {
    //   "appId": 8,
    //   "appDetails": "Connect to people",
    //   "version": "1.0v",
    //   "appName": "Connect",
    //   "url": "assets/icons-home/motion11.png",
    //   "userTable": [],
    //   "rating": 5,
    //   "routeScreen": 'admin/connect'
    // },
  ]

  constructor(private getApps: GetAppsService) { }

  ngOnInit() {
    // this.apps.pop()
    // console.log(this.apps, 'apps');
    this.getApps.getAppStore().subscribe((data)=>{
      console.log(data, 'data 4, db')
      this.apps = this.apps.concat(data)
    })

    // this.getApps.currentMessage.subscribe(message => {
    //   if (message['appId']) {
    //     this.apps.push(message)
    //   }
    // })
    // if (localStorage.getItem('apps')) {
    //   this.apps = this.apps.concat([...new Set(JSON.parse(localStorage.getItem('apps')))])
    // }
  }

}
