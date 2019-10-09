import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppInfoComponent } from '../app-info/app-info.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  starsCount: number = 2.5;
  starsCounts: number[] = [];
  images = ["assets/icons-home/motion01.png", "assets/icons-home/motion02.png", "assets/icons-home/motion03.png", "assets/icons-home/motion04.png", "assets/icons-home/motion05png", "assets/icons-home/motion06.png"];
  apps: any[] = [
    {
      "appId": 2,
      "appDetails": "This is Android",
      "version": "1.0v",
      "appName": "Fitness Tracker",
      "url": "assets/icons-home/motion01.png",
      "userTable": [],
      "rating": 2.5
    },
    {
      "appId": 3,
      "appDetails": "KEEPS TRACK OF WEIGHT, GLUCOSE LEVEL, ETC",
      "version": "1.0v",
      "appName": "Four Corners Of Health",
      "url": "assets/icons-home/motion02.png",
      "userTable": [],
      "rating": 3.5
    },
    {
      "appId": 4,
      "appDetails": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
      "version": "1.0v",
      "appName": "Health Knowledge Base",
      "url": "assets/icons-home/motion03.png",
      "userTable": [],
      "rating": 1.5
    },
    {
      "appId": 5,
      "appDetails": "KEEPS TRACK OF APPOITMENT",
      "version": "1.0v",
      "appName": "Calendar",
      "url": "assets/icons-home/motion04.png",
      "userTable": [],
      "rating": 4.5
    },
    {
      "appId": 6,
      "appDetails": "HELPS TO TRACK INSURANCE DETAILS AND CLAIMS",
      "version": "1.0v",
      "appName": "My Heart",
      "url": "assets/icons-home/motion05.png",
      "userTable": [],
      "rating": 5
    },
    // {
    //   "appId": 7,
    //   "appDetails": "SAYS ABOUT THE MEDICATION DETAILS",
    //   "version": "1.0v",
    //   "appName": "MY MEDICATIONS",
    //   "url": "assets/icons-home/motion06.png",
    //   "userTable": []
    //   },

  ]
  mapps: any[] = [
    {
      "appId": 7,
      "appDetails": "SAYS ABOUT THE MEDICATION DETAILS",
      "version": "1.0v",
      "appName": "MY MEDICATIONS",
      "url": "assets/icons-home/motion07.png",
      "userTable": [],
      "rating": 3.5

    },
    {
      "appId": 8,
      "appDetails": "SAYS ABOUT THE HEALTHprivate _bottomSheet: MatBottomSheet DOCUMENT DETAILS",
      "version": "1.0v",
      "appName": "MY HEALTH DOCUMENTS",
      "url": "assets/icons-home/motion08.png",
      "userTable": [],
      "rating": 5
    },
    {
      "appId": 9,
      "appDetails": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "version": "1.0v",
      "appName": "HEALTH CONNECT",
      "url": "assets/icons-home/motion09.jpeg",
      "userTable": [],
      "rating": 3
    },
    {
      "appId": 10,
      "appDetails": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "version": "1.0v",
      "appName": "INSURANCE CENTRAL",
      "url": "assets/icons-home/motion10.png",
      "userTable": [],
      "rating": 4
    },
    {
      "appId": 11,
      "appDetails": "MAINTAINS ALL MEDICAL RECORDS",
      "version": "1.0v",
      "appName": "EMR MANAGER",
      "url": "assets/icons-home/motion13.jpeg",
      "userTable": [],
      "rating": 4
    }
  ]

  constructor(private roter: Router, private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {

  }

  goTo(apps) {
    console.log(apps);
  }
  navigate(id) {
    if (id == 3) {
      this.roter.navigate(['dashboard']);
    }
  }

  openBottomSheet(app) {
    // console.log(id, 'id');
    this._bottomSheet.open(AppInfoComponent, { data: app });

  }

}
