import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  apps: any[] = [
    {
      "APPID": 1,
      "APP_NAME": "Hospital Pharmacy",
      "APP_LOCATION": "In Premises",
      "APP_TIMINGS": "24 Hours",
      "APP_PRES": 47,
      "APP_DURATION": "165 Minutes"
    },
    {
      "APPID": 2,
      "APP_NAME": "Walgreens",
      "APP_LOCATION": "124 Main St.",
      "APP_TIMINGS": "24 Hours",
      "APP_PRES": 12,
      "APP_DURATION": "20 Minutes"
    },
    {
      "APPID": 3,
      "APP_NAME": "CVS",
      "APP_LOCATION": "2100 EL Camino",
      "APP_TIMINGS": "Closed",
      "APP_PRES": 0,
      "APP_DURATION": "Opens 8:00 AM"
    },
    {
      "APPID": 4,
      "APP_NAME": "Rite Aid",
      "APP_LOCATION": "1 Bird Bind",
      "APP_TIMINGS": "24 Hours",
      "APP_PRES": 5,
      "APP_DURATION": "12 Minutes"
    },
    {
      "APPID": 5,
      "APP_NAME": "Walgreens",
      "APP_LOCATION": "In Premises",
      "APP_TIMINGS": "Closed",
      "APP_PRES": 0,
      "APP_DURATION": "Opens 9:00 AM"
    },
  ]
  shareCard(id) {
    console.log('share Clicked', id);
  }
  shareMessage(id) {
    console.log('msg Clicked', id);
  }

}
