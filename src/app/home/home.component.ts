import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images=["assets/icons-home/motion01.png","assets/icons-home/motion02.png","assets/icons-home/motion03.png","assets/icons-home/motion04.png","assets/icons-home/motion05png","assets/icons-home/motion06.png"];
  apps : any[] = [
    {
      "appId": 2,
      "appDetails": "This is Android",
      "version": "1.0v",
      "appName": "FITNESS TRACKER",
      "url": "assets/icons-home/motion01.png",
      "userTable": []
      
    },
    {
      "appId": 3,
      "appDetails": "KEEPS TRACK OF WEIGHT, GLUCOSE LEVEL, ETC",
      "version": "1.0v",
      "appName": "FOUR CORNERS OF HEALTH",
      "url": "assets/icons-home/motion02.png",
      "userTable": []
      },
      {
      "appId": 4,
      "appDetails": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
      "version": "1.0v",
      "appName": "HEALTH KNOWLEDGE BASE",
      "url": "assets/icons-home/motion03.png",
      "userTable": []
      },
      {
      "appId": 5,
      "appDetails": "KEEPS TRACK OF APPOITMENT",
      "version": "1.0v",
      "appName": "CALANDER",
      "url": "assets/icons-home/motion04.png",
      "userTable": []
      },
      {
      "appId": 6,
      "appDetails": "HELPS TO TRACK INSURANCE DETAILS AND CLAIMS",
      "version": "1.0v",
      "appName": "MY HEART",
      "url": "assets/icons-home/motion05.png",
      "userTable": []
      },
      {
        "appId": 7,
        "appDetails": "SAYS ABOUT THE MEDICATION DETAILS",
        "version": "1.0v",
        "appName": "MY MEDICATIONS",
        "url": "assets/icons-home/motion06.png",
        "userTable": []
        },
      
   ]
   mapps : any[] = [
    {
      "appId": 7,
      "appDetails": "SAYS ABOUT THE MEDICATION DETAILS",
      "version": "1.0v",
      "appName": "MY MEDICATIONS",
      "userTable": []
      },
      {
      "appId": 8,
      "appDetails": "SAYS ABOUT THE HEALTH DOCUMENT DETAILS",
      "version": "1.0v",
      "appName": "MY HEALTH DOCUMENTS",
      "userTable": []
      },
      {
      "appId": 9,
      "appDetails": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "version": "1.0v",
      "appName": "HEALTH CONNECT",
      "userTable": []
      },
      {
      "appId": 10,
      "appDetails": "HELPS YOU FIND THE APPROPRIATE DOCTOR",
      "version": "1.0v",
      "appName": "INSURANCE CENTRAL",
      "userTable": []
      },
      {
      "appId": 11,
      "appDetails": "MAINTAINS ALL MEDICAL RECORDS",
      "version": "1.0v",
      "appName": "EMR MANAGER",
      "userTable": []
      }
   ]
  

  constructor(private roter:Router) { }

  ngOnInit() {
  }

  goTo(apps){

    console.log(apps);

      
    
  }


  navigate(id){


    if(id==3){
    
    this.roter.navigate(['dashboard']);
    }
    
    }
}
