import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-knowledge-base',
  templateUrl: './health-knowledge-base.component.html',
  styleUrls: ['./health-knowledge-base.component.css']
})
export class HealthKnowledgeBaseComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit() {
  }

  apps: any[] = [
    {
      "appId":0,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "Recommended",
      "url": "assets/newRecomend.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'healthKnowledgeContent'
    },
    {
      "appId": 1,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "High BP",
      "url": "assets/icons-healthKnowledge/hbp.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'healthKnowledgeContent'
    },
    {
      "appId": 2,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "Heart",
      "url": "assets/newHeartforknowledgebase.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'healthKnowledgeContent'
    },
    {
      "appId": 3,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "Gout",
      "url":  "assets/icons-healthKnowledge/excl.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'healthKnowledgeContent'
    },
    {
      "appId": 4,
      "appDetails": "This is App Store Logo",
      "version": "1.0v",
      "appName": "Fitness",
      "url": "assets/newFitness.png",
      "userTable": [],
      "rating": 2.5,
      "routeScreen": 'healthKnowledgeContent'
    },
  ]

  openAppInfo(app){
    console.log('app', app);
    this.route.navigateByUrl('admin/healthKnowledgeBase/' + app.routeScreen)
    console.log('openAppInfo() clicked', app["appId"]);   
  }

}
