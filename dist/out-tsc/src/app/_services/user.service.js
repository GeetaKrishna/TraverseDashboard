import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`${environment.apiUrl}/users`);
    }
    getById(id) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }
};
UserService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map