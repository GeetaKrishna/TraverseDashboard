import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { GetAppsService } from '../_services/get-apps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @Input() test;
  images = ["assets/icons-home/motion01.png", "assets/icons-home/motion02.png", "assets/icons-home/motion03.png", "assets/icons-home/motion04.png", "assets/icons-home/motion05png", "assets/icons-home/motion06.png"];
  // apps: any[] = [
  //   {
  //     "APPID": 1,
  //     "APPDETAILS": "This is App Store Logo",
  //     "VERSION": "1.0v",
  //     "APPNAME": "Store",
  //     "URL": "assets/storeLogo.png",
  //     "userTable": [],
  //     "RATING": 2.5,
  //     "ROUTESCREEN": 'admin/home'
  //   },
  //   // {
  //   //   "appId": 2,
  //   //   "appDetails": "This is Android",
  //   //   "version": "1.0v",
  //   //   "appName": "Fitness Tracker",
  //   //   "url": "assets/icons-home/motion02.png",
  //   //   "userTable": [],
  //   //   "rating": 2.5,
  //   //   "routeScreen": 'admin/fitnessTracker/fitbit'
  //   // },
  //   // {
  //   //   "appId": 3,
  //   //   "appDetails": "KEEPS TRACK OF WEIGHT, GLUCOSE LEVEL, ETC",
  //   //   "version": "1.0v",
  //   //   "appName": "Four Corners Of Health",
  //   //   "url": "assets/icons-home/motion01.png",
  //   //   "userTable": [],
  //   //   "rating": 3.5,
  //   //   "routeScreen": 'admin/dashboard'
  //   // },
  //   // {
  //   //   "appId": 4,
  //   //   "appDetails": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
  //   //   "version": "1.0v",
  //   //   "appName": "Health Knowledge Base",
  //   //   "url": "assets/icons-home/motion03.png",
  //   //   "userTable": [],
  //   //   "rating": 1.5,
  //   //   "routeScreen": 'admin/healthKnowledgeBase'
  //   // },
  //   // {
  //   //   "appId": 5,
  //   //   "appDetails": "KEEPS TRACK OF APPOITMENT",
  //   //   "version": "1.0v",
  //   //   "appName": "Calendar",
  //   //   "url": "assets/icons-home/calendar.jpg",
  //   //   "userTable": [],
  //   //   "rating": 4.5,
  //   //   "routeScreen": 'admin/calendar'
  //   // },
  //   // {
  //   //   "appId": 6,
  //   //   "appDetails": "HELPS TO TRACK INSURANCE DETAILS AND CLAIMS",
  //   //   "version": "1.0v",
  //   //   "appName": "My Heart",
  //   //   "url": "assets/myHeart/myHeartt.png",
  //   //   "userTable": [],
  //   //   "rating": 5,
  //   //   "routeScreen": 'admin/myHeart'
  //   // },
  //   // {
  //   //   "appId": 7,
  //   //   "appDetails": "For Medication details",
  //   //   "version": "1.0v",
  //   //   "appName": "Medications",
  //   //   "url": "assets/icons-home/motion07.png",
  //   //   "userTable": [],
  //   //   "rating": 5,
  //   //   "routeScreen": 'admin/medication'
  //   // },
  //   // {
  //   //   "appId": 8,
  //   //   "appDetails": "Connect to people",
  //   //   "version": "1.0v",
  //   //   "appName": "Connect",
  //   //   "url": "assets/icons-home/motion11.png",
  //   //   "userTable": [],
  //   //   "rating": 5,
  //   //   "routeScreen": 'admin/connect'
  //   // },
  // ]

  apps: any[] = [

    {
      "APP_ID": 1,
      "APP_DETAILS": "This is Android Fitbit tracker which is used to track your fitness details.",
      "VERSION": "1.0v",
      "APPNAME": "Fitness Tracker",
      "URL": "assets/newfitness.png",
      "userTable": [],
      "RATING": 2.5,
      "ROUTESCREEN": 'admin/fitnessTracker/fitbit',
      "installed": false
    },
    {
      "APP_ID": 2,
      "APP_DETAILS": "KEEPS TRACK OF WEIGHT, GLUCOSE LEVEL, ETC",
      "VERSION": "1.0v",
      "APPNAME": "Four Corners Of Health",
      "URL": "assets/newfourC.png",
      "userTable": [],
      "RATING": 3.5,
      "ROUTESCREEN": 'admin/dashboard',
      "installed": false
      
    },
    {
      "APP_ID": 3,
      "APP_DETAILS": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
      "VERSION": "1.0v",
      "APPNAME": "Health Knowledge Base",
      "URL": "assets/newhealth.png",
      "userTable": [],
      "RATING": 1.5,
      "ROUTESCREEN": 'admin/healthKnowledgeBase/healthKnowledgeContent',
      "installed": false
    },
    {
      "APP_ID": 4,
      "APP_DETAILS": "KEEPS TRACK OF APPOITMENT",
      "VERSION": "1.0v",
      "APPNAME": "Calendar",
      "URL": "assets/calendar1.png",
      "userTable": [],
      "RATING": 4.5,
      "ROUTESCREEN": 'admin/calendar',
      "installed": false
    },
    {
      "APP_ID": 5,
      "APP_DETAILS": "HELPS TO TRACK INSURANCE DETAILS AND CLAIMS",
      "VERSION": "1.0v",
      "APPNAME": "My Heart",
      "URL": "assets/newHeart.png",
      "userTable": [],
      "RATING": 5,
      "ROUTESCREEN": 'admin/myHeart',
      "installed": false
    },
    {
      "APP_ID": 6,
      "APP_DETAILS": "SAYS ABOUT THE MEDICATION DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "My Medications",
      "URL": "assets/newMedications.png",
      "userTable": [],
      "RATING": 3.5,
      "ROUTESCREEN": 'admin/medication',
      "installed": false

    },
    {
      "APP_ID": 7,
      "APP_DETAILS": "SAYS ABOUT THE HEALTH DOCUMENT DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Health Documents",
      "URL": "assets/newHealthdocs.png",
      "userTable": [],
      "RATING": 5,
      "ROUTESCREEN": 'admin/document/Personal',
      "installed": false
    },
    {
      "APP_ID": 8,
      "APP_DETAILS": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "VERSION": "1.0v",
      "APPNAME": "Health Connect",
      "URL": "assets/newHealthconnect.png",
      "userTable": [],
      "RATING": 3,
      "ROUTESCREEN": 'admin/healthconnect',
      "installed": false
    },
    {
      "APP_ID": 9,
      "APP_DETAILS": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "VERSION": "1.0v",
      "APPNAME": "Insurance Central",
      "URL": "assets/newhealthIns.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/insurance',
      "installed": false
    },
    {
      "APP_ID": 10,
      "APP_DETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Electronic Health Records",
      "URL": "assets/hrt.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/electronicHealth/Visits',
      "installed": false
    },
    {
      "APP_ID": 11,
      "APP_DETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Family View",
      "URL": "assets/family.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/family',
      "installed": false
    },
    {
      "APP_ID": 12,
      "APP_DETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Medical Conditions",
      "URL": "assets/medicalCondition/medicationLogo.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/medicalCondition',
      "installed": false
    },
    // {
    //   "APP_ID": 11,
    //   "APP_DETAILS": "MAINTAINS ALL MEDICAL RECORDS",
    //   "VERSION": "1.0v",
    //   "APPNAME": "EMR Manager",
    //   "URL": "assets/hrt.png",
    //   "userTable": [],
    //   "RATING": 4,
    //   "ROUTESCREEN": 'admin/**',
    //   "installed": false
    // }
    // {
    //   "APP_ID": 7,
    //   "APP_DETAILS": "SAYS ABOUT THE MEDICATION DETAILS",
    //   "VERSION": "1.0v",
    //   "APPNAME": "MY MEDICATIONS",
    //   "URL": "assets/icons-home/motion06.png",
    //   "userTable": []
    //   },

  ]
  userApps = [{
    "APP_ID": 0,
    "APP_DETAILS": "This is App Store Logo",
    "VERSION": "1.0v",
    "APPNAME": "Store",
    "URL": "assets/newstoree.png",
    "userTable": [],
    "RATING": 2.5,
    "ROUTESCREEN": 'admin/home'
  },];
  constructor(private getApps: GetAppsService, private route: Router) { }
  nav(routes) {
    this.route.navigateByUrl(routes)
  }
  ngOnInit() {
    // this.apps.pop()
    // console.log(this.apps, 'apps');
    this.getApps.getAppStore(localStorage.getItem("userId")).subscribe((data: []) => {
      console.log(data, 'data 4, db')
      this.apps.map((e) => {
        data.map((userData) => {
          if (e.APP_ID == userData['appId']) {
            e.installed = true;
            this.userApps = this.userApps.concat(e)
            console.log(this.userApps, "test");
          }
        })
      })

      console.log(this.userApps);


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
