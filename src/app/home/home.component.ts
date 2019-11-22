import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppInfoComponent } from '../app-info/app-info.component';
import { GetAppsService } from '../_services/get-apps.service';
import { element } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedVal: String = 'Consumers'
  selected = 'Consumers'
  starsCount: number = 2.5;
  starsCounts: number[] = [];
  images = ["assets/icons-home/motion01.png", "assets/icons-home/motion02.png", "assets/icons-home/motion03.png", "assets/icons-home/motion04.png", "assets/icons-home/motion05png", "assets/icons-home/motion06.png"];
  apps: any[] = [
    {
      "APPID": 2,
      "APPDETAILS": "This is Android Fitbit tracker which is used to track your fitness details.",
      "VERSION": "1.0v",
      "APPNAME": "Fitness Tracker",
      "URL": "assets/icons-home/fitnesstracker.jpg",
      "userTable": [],
      "RATING": 2.5,
      "ROUTESCREEN": 'admin/fitnessTracker/fitbit',
      "installed": false
    },
    {
      "APPID": 3,
      "APPDETAILS": "KEEPS TRACK OF WEIGHT, GLUCOSE LEVEL, ETC",
      "VERSION": "1.0v",
      "APPNAME": "Four Corners Of Health",
      "URL": "assets/icons-home/motion01.png",
      "userTable": [],
      "RATING": 3.5,
      "ROUTESCREEN": 'admin/dashboard',
      "installed": false
    },
    {
      "APPID": 4,
      "APPDETAILS": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
      "VERSION": "1.0v",
      "APPNAME": "Health Knowledge Base",
      "URL": "assets/icons-home/healthKnowledgeBase.jpeg",
      "userTable": [],
      "RATING": 1.5,
      "ROUTESCREEN": 'admin/healthKnowledgeBase/healthKnowledgeContent',
      "installed": false
    },
    {
      "APPID": 5,
      "APPDETAILS": "KEEPS TRACK OF APPOITMENT",
      "VERSION": "1.0v",
      "APPNAME": "Calendar",
      "URL": "assets/calendar1.png",
      "userTable": [],
      "RATING": 4.5,
      "ROUTESCREEN": 'admin/calendar',
      "installed": false
    },
    {
      "APPID": 6,
      "APPDETAILS": "HELPS TO TRACK INSURANCE DETAILS AND CLAIMS",
      "VERSION": "1.0v",
      "APPNAME": "My Heart",
      "URL": "assets/icons-home/motion05.png",
      "userTable": [],
      "RATING": 5,
      "ROUTESCREEN": 'admin/myHeart',
      "installed": false
    },
    {
      "APPID": 7,
      "APPDETAILS": "SAYS ABOUT THE MEDICATION DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "My Medications",
      "URL": "assets/icons-home/motion07.png",
      "userTable": [],
      "RATING": 3.5,
      "ROUTESCREEN": 'admin/medication',
      "installed": false

    },
    {
      "APPID": 8,
      "APPDETAILS": "SAYS ABOUT THE HEALTH DOCUMENT DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Health Documents",
      "URL": "assets/icons-home/healthDocuments.png",
      "userTable": [],
      "RATING": 5,
      "ROUTESCREEN": 'admin/document/Personal',
      "installed": false
    },
    {
      "APPID": 9,
      "APPDETAILS": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "VERSION": "1.0v",
      "APPNAME": "Health Connect",
      "URL": "assets/icons-home/motion09.jpeg",
      "userTable": [],
      "RATING": 3,
      "ROUTESCREEN": 'admin/healthconnect',
      "installed": false
    },
    {
      "APPID": 10,
      "APPDETAILS": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "VERSION": "1.0v",
      "APPNAME": "Insurance Central",
      "URL": "assets/icons-home/motion10.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/insurance',
      "installed": false
    },
    {
      "APPID": 11,
      "APPDETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Electronic Health Records",
      "URL": "assets/hrt.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/electronicHealth/Visits',
      "installed": false
    },
    {
      "APPID": 12,
      "APPDETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Family View",
      "URL": "assets/family.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/family',
      "installed": false
    },
    {
      "APPID": 13,
      "APPDETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Medical Conditions",
      "URL": "assets/medicalCondition/medicationLogo.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/medicalCondition',
      "installed": false
    },
    // {
    //   "APPID": 11,
    //   "APPDETAILS": "MAINTAINS ALL MEDICAL RECORDS",
    //   "VERSION": "1.0v",
    //   "APPNAME": "EMR Manager",
    //   "URL": "assets/hrt.png",
    //   "userTable": [],
    //   "RATING": 4,
    //   "ROUTESCREEN": 'admin/**',
    //   "installed": false
    // }
    // {
    //   "APPID": 7,
    //   "APPDETAILS": "SAYS ABOUT THE MEDICATION DETAILS",
    //   "VERSION": "1.0v",
    //   "APPNAME": "MY MEDICATIONS",
    //   "URL": "assets/icons-home/motion06.png",
    //   "userTable": []
    //   },

  ]
  mapps: any[] = [
    {
      "APPID": 7,
      "APPDETAILS": "SAYS ABOUT THE MEDICATION DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "My Medications",
      "URL": "assets/icons-home/motion07.png",
      "userTable": [],
      "RATING": 3.5,
      "ROUTESCREEN": 'admin/medication',
      "installed": false

    },
    {
      "APPID": 8,
      "APPDETAILS": "SAYS ABOUT THE HEALTH DOCUMENT DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Health Documents",
      "URL": "assets/icons-home/healthDocuments.png",
      "userTable": [],
      "RATING": 5,
      "ROUTESCREEN": 'admin/document/Personal',
      "installed": false
    },
    {
      "APPID": 9,
      "APPDETAILS": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "VERSION": "1.0v",
      "APPNAME": "Health Connect",
      "URL": "assets/icons-home/motion09.jpeg",
      "userTable": [],
      "RATING": 3,
      "ROUTESCREEN": 'admin/healthconnect',
      "installed": false
    },
    {
      "APPID": 10,
      "APPDETAILS": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "VERSION": "1.0v",
      "APPNAME": "Insurance Central",
      "URL": "assets/icons-home/motion10.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/insurance',
      "installed": false
    },
    {
      "APPID": 11,
      "APPDETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Electronic Health Records",
      "URL": "assets/hrt.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/electronicHealth/Visits',
      "installed": false
    },
    {
      "APPID": 12,
      "APPDETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Family View",
      "URL": "assets/hrt.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/family',
      "installed": false
    },
    {
      "APPID": 13,
      "APPDETAILS": "MAINTAINS ALL HEALTH RECORDS",
      "VERSION": "1.0v",
      "APPNAME": "Medical Conditions",
      "URL": "assets/hrt.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/medicalCondition',
      "installed": false
    },
    // {
    //   "APPID": 11,
    //   "APPDETAILS": "MAINTAINS ALL MEDICAL RECORDS",
    //   "VERSION": "1.0v",
    //   "APPNAME": "EMR Manager",
    //   "URL": "assets/hrt.png",
    //   "userTable": [],
    //   "RATING": 4,
    //   "ROUTESCREEN": 'admin/**',
    //   "installed": false
    // }
  ]
  pApps: any[] = [
    {
      "APPID": 20,
      "APPDETAILS": "SAYS ABOUT THE LABORATORY DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Laboratory",
      "URL": "assets/icons-home/Lab.png",
      "userTable": [],
      "RATING": 3.5,
      "ROUTESCREEN": 'admin/labReports/Labs',
      "installed": false
    },
    {
      "APPID": 21,
      "APPDETAILS": "SAYS ABOUT THE PATIENT DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Patients",
      "URL": "assets/icons-home/patients.png",
      "userTable": [],
      "RATING": 5,
      "ROUTESCREEN": 'admin/patientView',
      "installed": false
    },
    {
      "APPID": 22,
      "APPDETAILS": "SAYS ABOUT THE BILLING DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Billing",
      "URL": "assets/icons-home/billing.png",
      "userTable": [],
      "RATING": 4,
      "ROUTESCREEN": 'admin/patientBilling',
      "installed": false
    },
    {
      "APPID": 23,
      "APPDETAILS": "SAYS ABOUT THE PHARMACY DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Pharmacy",
      "URL": "assets/icons-home/pharmacy.webp",
      "userTable": [],
      "RATING": 3,
      "ROUTESCREEN": 'admin/pharmacy',
      "installed": false
    },
    {
      "APPID": 24,
      "APPDETAILS": "SAYS ABOUT THE RECORDS DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Records",
      "URL": "assets/icons-home/records.png",
      "userTable": [],
      "RATING": 5,
      "ROUTESCREEN": 'admin/recordsProvider',
      "installed": false
    },
    {
      "APPID": 25,
      "APPDETAILS": "SAYS ABOUT THE PROVIDERS CONNECT DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Providers Connect",
      "URL": "assets/icons-home/providers.png",
      "userTable": [],
      "RATING": 1,
      // "ROUTESCREEN": 'admin/medication',
      "installed": false
    },
    {
      "APPID": 26,
      "APPDETAILS": "SAYS ABOUT THE EMERGENCY ROOM DETAILS",
      "VERSION": "1.0v",
      "APPNAME": "Emergency Room",
      "URL": "assets/icons-home/emer.png",
      "userTable": [],
      "RATING": 2.5,
      "ROUTESCREEN": 'admin/emergency',
      "installed": false
    },
    {
      "APPID": 4,
      "APPDETAILS": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
      "VERSION": "1.0v",
      "APPNAME": "Health Knowledge Base",
      "URL": "assets/icons-home/healthKnowledgeBase.jpeg",
      "userTable": [],
      "RATING": 1.5,
      "ROUTESCREEN": 'admin/healthKnowledgeBase/healthKnowledgeContent',
      "installed": false
    }
  ]

  constructor(private roter: Router, private getApps: GetAppsService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {

    this.getApps.getAppStore().subscribe((data: []) => {
      console.log(data, 'data 4, db')
      // this.apps = this.apps.concat(data)

      data.map((k) => {
        this.apps.forEach((element) => {
          if (k['APPID'] === element.APPID) {
            element.installed = true;
          }
        })
        this.mapps.forEach((element) => {
          if (k['APPID'] === element.APPID) {
            element.installed = true;
          }
        })
      })
    })

    // console.log(this.apps, this.mapps)

  }

  goTo(apps) {
    console.log(apps);
  }
  changeClient(value) {
    this.selectedVal = value
    console.log(value);
  }
  // navigate(id) {
  //   if (id == 3) {
  //     this.roter.navigate(['admin/dashboard']);
  //   }
  // }

  openBottomSheet(app) {
    this._bottomSheet.open(AppInfoComponent, { data: app }).afterDismissed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.apps.map((element, index) => {
          // console.log('dsad', element.APPID)
          // console.log('dsad',data)
          if (element.APPID === data.data) {
            // console.log('dsad', element.APPID)
            this.apps[index].installed = !this.apps[index].installed;
            // console.log('dsad', this.apps[index])
          }
        })
        console.log(this.apps);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
