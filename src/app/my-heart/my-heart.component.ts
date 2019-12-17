import { Component, OnInit } from '@angular/core';
import { MyHeartService } from '../_services/my-heart.service';

@Component({
  selector: 'app-my-heart',
  templateUrl: './my-heart.component.html',
  styleUrls: ['./my-heart.component.css']
})
export class MyHeartComponent implements OnInit {

  constructor(private myHeartService: MyHeartService) { }

  ngOnInit() {
    this.myHeartService.getHeartRateByPatientId().subscribe((data) => {
      console.log(data);

    }, (err) => {
      console.log(err);

    })
    this.myHeartService.getEkgByPatientId().subscribe((data) => {
      console.log(data);

    }, (err) => {
      console.log(err);

    })

  }

  apps: any[] = [
    {
      "appId": 1,
      "details": 78,
      "version": "1.0v",
      "appName": "HeartRate",
      "url": "assets/myHeart/myheartlogo.jpg",
      "time": "2 days ago"
    },
    {
      "appId": 2,
      "details": "147/93",
      "version": "1.0v",
      "appName": "Blood Pressure",
      "url": "assets/icons-home/motion02.png",
      "time": ""
    },
    {
      "appId": 3,
      "details": "You have a Doctor Appointment coming up, Please check your calendar.",
      "version": "1.0v",
      "appName": "Appointment",
      "url": "assets/icons-home/motion01.png",
      "time": ""
    },
    {
      "appId": 4,
      "details": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
      "version": "1.0v",
      "appName": "EKG",
      "url": "assets/myHeart/EKG.png",
      "time": "3 days ago"
    },
    {
      "appId": 5,
      "details": "KEEPS TRACK OF APPOITMENT",
      "version": "1.0v",
      "appName": "Medication",
      "content": "20mg",
      "nature": "improves blood flow",
      "text": "Benazepril ",
      "url": "assets/medications/benazepril.jpg",
      "time": "twice a day"
    },
    {
      "appId": 6,
      "details": "0.8 mg/dl",
      "version": "1.0v",
      "appName": "Lab",
      "text": "Creatinine",
      "url": "assets/myHeart/lab.png",
      "time": "10/23/19"
    },
    {
      "appId": 8,
      "details": "3000 Steps",
      "version": "1.0v",
      "appName": "Steps / Activity",
      "url": "assets/myHeart/walk.png",
      "time": "3 days ago"
    }, {
      "appId": 7,
      "details": "2 Miles",
      "version": "1.0v",
      "appName": "Distance",
      "url": "assets/runn.png",
      "time": "yesterday"
    },
  ]
}