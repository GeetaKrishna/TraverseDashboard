import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let InsuranceService = class InsuranceService {
    constructor(http) {
        this.http = http;
        this.url = `${environment.apiUrl}`;
    }
    getPlans() {
        return this.http.get(this.url + '/plans');
    }
    getClaims() {
        return this.http.get(this.url + '/claims');
    }
};
InsuranceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], InsuranceService);
export { InsuranceService };
//# sourceMappingURL=insurance.service.js.map