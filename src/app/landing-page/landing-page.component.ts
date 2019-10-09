import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  images = ["assets/icons-home/motion01.png", "assets/icons-home/motion02.png", "assets/icons-home/motion03.png", "assets/icons-home/motion04.png", "assets/icons-home/motion05png", "assets/icons-home/motion06.png"];
  apps: any[] = [
    {
      "appId": 1,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "Store",
      "url": "assets/storeLogo.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": '/home'
    },
    {
      "appId": 2,
      "appDetails": "This is Android",
      "version": "1.0v",
      "appName": "Fitness Tracker",
      "url": "assets/icons-home/motion02.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": '/fitnessTracker/fitbit'
    },
    {
      "appId": 3,
      "appDetails": "KEEPS TRACK OF WEIGHT, GLUCOSE LEVEL, ETC",
      "version": "1.0v",
      "appName": "Four Corners Of Health",
      "url": "assets/icons-home/motion01.png",
      "userTable": [],
      "rating": 3.5,
      "routeScreen": '/dashboard'
    },
    {
      "appId": 4,
      "appDetails": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
      "version": "1.0v",
      "appName": "Health Knowledge Base",
      "url": "assets/icons-home/kb.jpg",
      "userTable": [],
      "rating": 1.5,
      "routeScreen": '/knowledgebase'
    },
    {
      "appId": 5,
      "appDetails": "KEEPS TRACK OF APPOITMENT",
      "version": "1.0v",
      "appName": "Calendar",
      "url": "assets/icons-home/calendar.jpg",
      "userTable": [],
      "rating": 4.5,
      "routeScreen": '/calendar'
    },
    {
      "appId": 6,
      "appDetails": "HELPS TO TRACK INSURANCE DETAILS AND CLAIMS",
      "version": "1.0v",
      "appName": "My Heart",
      "url": "assets/icons-home/motion13.jpeg",
      "userTable": [],
      "rating": 5,
      "routeScreen": '/myHeart'
    },
  ]
  
  constructor() { }

  ngOnInit() {
  }

  changeBackground(k)
  {

    console.log("backGround", k.files[0]  )

  } 

}
