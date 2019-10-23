import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let MobileFitnessComponent = class MobileFitnessComponent {
    constructor(route) {
        this.route = route;
        this.apps = [
            {
                "appId": 1,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "FitBit",
                "url": "assets/fitbit.png",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'fitbit'
            },
            {
                "appId": 2,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "Strava",
                "url": "assets/strava.png",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'fitbit'
            },
            {
                "appId": 3,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "Garmin",
                "url": "assets/garmin.jpeg",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'fitbit'
            },
            {
                "appId": 4,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "Sleep Cycle",
                "url": "assets/sleepCycle.jpg",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'fitbit'
            },
        ];
    }
    ngOnInit() {
    }
    openAppInfo(app) {
        console.log('app', app);
        this.route.navigateByUrl('admin/fitnessTracker/' + app.routeScreen);
        console.log('openAppInfo() clicked', app["appId"]);
    }
};
MobileFitnessComponent = tslib_1.__decorate([
    Component({
        selector: 'app-mobile-fitness',
        templateUrl: './mobile-fitness.component.html',
        styleUrls: ['./mobile-fitness.component.css']
    })
], MobileFitnessComponent);
export { MobileFitnessComponent };
//# sourceMappingURL=mobile-fitness.component.js.map