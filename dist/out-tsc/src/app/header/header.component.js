import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HeaderComponent = class HeaderComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
    }
    backGroundImageChange(k) {
        console.log(k.files[0]);
        var t = this.elementRef;
        var reader = new FileReader();
        reader.onload = function (e) {
            t.nativeElement.ownerDocument.body.style.backgroundImage = 'url(' + reader.result + ')';
        };
        reader.readAsDataURL(k.files[0]); //attempts to read the file in question.
        console.log(localStorage);
    }
};
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.less']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map