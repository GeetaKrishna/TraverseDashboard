import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HealthKnowledgeContentComponent = class HealthKnowledgeContentComponent {
    constructor() {
        this.apps = [
            {
                "appId": 1,
                "appTitle": "Top 10 Natural options for Gout Treatment",
                "appContent": " The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
                "url": "assets/icons-healthKnowledge/honey.jpg",
            },
            {
                "appId": 2,
                "appTitle": "Study Finds Best Exercise Routine to Strengthen your Heart",
                "appContent": " The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
                "url": "assets/icons-healthKnowledge/heart.jpeg",
            },
            {
                "appId": 3,
                "appTitle": "FDA Issues Warning About Popular Blood Pressure Drug",
                "appContent": " The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
                "url": "assets/icons-healthKnowledge/BloodPressure.jpg",
            },
            {
                "appId": 4,
                "appTitle": "What is the Best Sleeping Position By Age",
                "appContent": " The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
                "url": "assets/icons-healthKnowledge/baby.jpg",
            }
        ];
        this.searchVal = '';
    }
    ngOnInit() {
    }
    searchValue(searchVal) {
        console.log('searchValue', searchVal);
    }
    clearValue() {
        this.searchVal = '';
        console.log('clear val', this.searchValue);
    }
    shareCard(id) {
        console.log('share Clicked', id);
    }
    shareMessage(id) {
        console.log('msg Clicked', id);
    }
};
HealthKnowledgeContentComponent = tslib_1.__decorate([
    Component({
        selector: 'app-health-knowledge-content',
        templateUrl: './health-knowledge-content.component.html',
        styleUrls: ['./health-knowledge-content.component.css']
    })
], HealthKnowledgeContentComponent);
export { HealthKnowledgeContentComponent };
//# sourceMappingURL=health-knowledge-content.component.js.map