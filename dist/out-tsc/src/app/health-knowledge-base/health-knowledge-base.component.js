import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HealthKnowledgeBaseComponent = class HealthKnowledgeBaseComponent {
    constructor(route) {
        this.route = route;
        this.apps = [
            {
                "appId": 0,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "Recommended for you",
                "url": "assets/icons-healthKnowledge/star.png",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'healthKnowledgeContent'
            },
            {
                "appId": 1,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "High Blood Pressure",
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
                "url": "assets/icons-healthKnowledge/heart.jpg",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'healthKnowledgeContent'
            },
            {
                "appId": 3,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "Gout",
                "url": "assets/icons-healthKnowledge/excl.png",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'healthKnowledgeContent'
            },
            {
                "appId": 4,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "Fitness",
                "url": "assets/icons-home/motion02.png",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'healthKnowledgeContent'
            },
        ];
    }
    ngOnInit() {
    }
    openAppInfo(app) {
        console.log('app', app);
        this.route.navigateByUrl('admin/healthKnowledgeBase/' + app.routeScreen);
        console.log('openAppInfo() clicked', app["appId"]);
    }
};
HealthKnowledgeBaseComponent = tslib_1.__decorate([
    Component({
        selector: 'app-health-knowledge-base',
        templateUrl: './health-knowledge-base.component.html',
        styleUrls: ['./health-knowledge-base.component.css']
    })
], HealthKnowledgeBaseComponent);
export { HealthKnowledgeBaseComponent };
//# sourceMappingURL=health-knowledge-base.component.js.map