import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(router, route) {
        this.router = router;
        this.route = route;
        this.title = 'dashboard';
        // router.events
        //   .filter(e => e instanceof NavigationEnd)
        //   .forEach(e => {
        //     this.title = route.root.firstChild.snapshot.data['PageName'];
        // });
    }
    ngOnInit() {
        // if (this.router.url == '/') {
        //   console.log('yooooooo');
        //   this.show = true;
        // } else {
        //   this.show = false
        // }
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map