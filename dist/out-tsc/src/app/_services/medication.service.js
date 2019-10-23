import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
let MedicationService = class MedicationService {
    constructor(http) {
        this.http = http;
        this.url = 'http://172.17.5.45:8080';
    }
    getMedtcations() {
        return this.http.get(`${environment.apiUrl}/api/medications/getmedpres`);
    }
    addMedication(jsonObject) {
        this.http.post(`${environment.apiUrl}/api/medications/addmedication`, jsonObject).toPromise().then((data) => {
            console.log("returned object" + JSON.stringify(data));
        });
    }
    addMedicationPP(jsonObject) {
        this.http.post(`${environment.apiUrl}/api/medications/addPP`, jsonObject).toPromise().then((data) => {
            console.log("returned object" + JSON.stringify(data));
        });
    }
    addMedicationPPD(jsonObject) {
        this.http.post(`${environment.apiUrl}/api/medications/addPPD`, jsonObject).toPromise().then((data) => {
            console.log("returned object" + JSON.stringify(data));
        });
    }
    deleteMedtcations(id) {
        return this.http.delete(`${environment.apiUrl}/api/medications/${id}`);
    }
};
MedicationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], MedicationService);
export { MedicationService };
//# sourceMappingURL=medication.service.js.map