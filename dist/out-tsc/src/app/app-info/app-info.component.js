import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
let AppInfoComponent = class AppInfoComponent {
    constructor(route, getApp, _bottomSheetRef, data) {
        this.route = route;
        this.getApp = getApp;
        this._bottomSheetRef = _bottomSheetRef;
        this.data = data;
        this.install = false;
        this.appsToBePushed = [];
        console.log(data, 'recievedData');
        this.app = data;
    }
    ngOnInit() {
    }
    openLink(event) {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
    updateApp(id) {
        console.log('update clicked');
    }
    installApp(id) {
        console.log('install clicked', id);
        if (id == 2) {
            this._bottomSheetRef.dismiss();
            this.route.navigateByUrl('admin/fitnessTracker/fitbit');
        }
        else if (id == 3) {
            this._bottomSheetRef.dismiss();
            this.route.navigateByUrl('admin/dashboard');
        }
        else if (id == 4) {
            this._bottomSheetRef.dismiss();
            this.route.navigateByUrl('admin/healthKnowledgeBase');
        }
        else if (id == 5) {
            this._bottomSheetRef.dismiss();
            this.route.navigateByUrl('admin/calendar');
        }
        else if (id == 7) {
            this._bottomSheetRef.dismiss();
            this.route.navigateByUrl('admin/medication');
        }
        // this.getApp.addApp(this.app);
        if (JSON.parse(localStorage.getItem("apps"))) {
            if (JSON.parse(localStorage.getItem("apps")).length > 0) {
                console.log("inside");
                this.appsToBePushed = this.appsToBePushed.concat(JSON.parse(localStorage.getItem("apps")));
            }
        }
        this.appsToBePushed.push(this.data);
        // console.log(new Set(this.appsToBePushed));
        localStorage.setItem('apps', JSON.stringify(this.appsToBePushed));
        this.install = !this.install;
    }
    uninstallApp(id) {
        console.log('uninstall clicked');
        this.install = !this.install;
    }
};
AppInfoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-app-info',
        templateUrl: './app-info.component.html',
        styleUrls: ['./app-info.component.css']
    }),
    tslib_1.__param(3, Inject(MAT_BOTTOM_SHEET_DATA))
], AppInfoComponent);
export { AppInfoComponent };
//# sourceMappingURL=app-info.component.js.map