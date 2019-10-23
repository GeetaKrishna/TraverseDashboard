import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let LandingPageComponent = class LandingPageComponent {
    constructor(getApps) {
        this.getApps = getApps;
        this.images = ["assets/icons-home/motion01.png", "assets/icons-home/motion02.png", "assets/icons-home/motion03.png", "assets/icons-home/motion04.png", "assets/icons-home/motion05png", "assets/icons-home/motion06.png"];
        this.apps = [
            {
                "appId": 1,
                "appDetails": "This is App Store Logo",
                "version": "1.0v",
                "appName": "Store",
                "url": "assets/storeLogo.png",
                "userTable": [],
                "rating": 2.5,
                "routeScreen": 'admin/home'
            },
        ];
    }
    ngOnInit() {
        // this.apps.pop()
        console.log(this.apps, 'apps');
        // this.getApps.currentMessage.subscribe(message => {
        //   if (message['appId']) {
        //     this.apps.push(message)
        //   }
        // })
        if (localStorage.getItem('apps')) {
            this.apps = this.apps.concat([...new Set(JSON.parse(localStorage.getItem('apps')))]);
        }
    }
};
tslib_1.__decorate([
    Input()
], LandingPageComponent.prototype, "test", void 0);
LandingPageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-landing-page',
        templateUrl: './landing-page.component.html',
        styleUrls: ['./landing-page.component.css']
    })
], LandingPageComponent);
export { LandingPageComponent };
//# sourceMappingURL=landing-page.component.js.map