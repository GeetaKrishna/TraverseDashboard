import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
let MedicationsComponent = class MedicationsComponent {
    constructor(http, medServ) {
        this.http = http;
        this.medServ = medServ;
        this.apps = [
            {
                "medication": "Add Medication",
                "medicationImage": "assets/icons-home/motion01.png",
                "color": "lightgrey"
            },
            {
                "appId": 2,
                "medicationDetails": "This is Benazepril",
                "medication": "Benazepril",
                "medicationImage": "assets/medications/benazepril.jpg",
                "medicationIndication": "warn",
                "medicationSchedule": "twice",
                "color": "lightblue"
            },
            {
                "appId": 4,
                "medicationDetails": "This is Candesartan",
                "medication": "Candesartan",
                "medicationImage": "assets/medications/candestron.jpg",
                "medicationIndication": "warn",
                "medicationSchedule": "thrice",
                "color": "lightpink"
            },
            {
                "appId": 5,
                "medicationDetails": "This is Liptor",
                "medication": "Liptor",
                "medicationImage": "assets/medications/lipitol.jpg",
                "medicationIndication": "warn",
                "medicationSchedule": "once",
                "color": "aliceblue"
            },
            {
                "appId": 6,
                "medicationDetails": "This is Vicodin",
                "medication": "Vicodin",
                "medicationImage": "assets/medications/vicodin.jpg",
                "medicationIndication": "warns",
                "medicationSchedule": "four times",
                "color": "lightyellow"
            },
            {
                "appId": 7,
                "medicationDetails": "This is Metformin",
                "medication": "Metformin",
                "medicationImage": "assets/medications/metformin.jpg",
                "medicationIndication": "warns",
                "medicationSchedule": "four times",
                "color": "lightgreen"
            },
        ];
        this.addMedicationToggle = true;
        this.medName = new FormControl('');
        this.medIntake = new FormControl('');
    }
    ngOnInit() {
    }
    toggleMedication() {
        this.addMedicationToggle = !this.addMedicationToggle;
    }
    successAdding() {
        this.medData = {
            "name": this.medName.value,
            "intake": this.medIntake.value,
        };
        this.apps.push({
            "appId": 7,
            "medicationDetails": "This is " + this.medName.value,
            "medication": this.medName.value,
            "medicationImage": "assets/medications/metformin.jpg",
            "medicationIndication": "warns",
            "medicationSchedule": this.medIntake.value + " times",
            "color": "lightgreen"
        });
        this.medServ.addMedication(this.medData);
        console.log(this.medData, 'data');
        this.medName.setValue('');
        this.medIntake.setValue('');
        this.addMedicationToggle = !this.addMedicationToggle;
    }
    cancelAdding() {
        this.medName.setValue('');
        this.medIntake.setValue('');
        this.addMedicationToggle = !this.addMedicationToggle;
    }
    removeMedication(k) {
        this.apps.splice(k, 1);
    }
};
MedicationsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-medications',
        templateUrl: './medications.component.html',
        styleUrls: ['./medications.component.css']
    })
], MedicationsComponent);
export { MedicationsComponent };
//# sourceMappingURL=medications.component.js.map