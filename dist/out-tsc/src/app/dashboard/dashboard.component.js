import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as Chart from 'chart.js';
// import { runInThisContext } from 'vm';
let DashboardComponent = class DashboardComponent {
    constructor(dashboardService, getApp) {
        this.dashboardService = dashboardService;
        this.getApp = getApp;
        this.weightInfo = 'Weight is Normal';
        this.bloodPressureInfo = 'Blood Pressure is Normal';
        this.glucoseInfo = 'Glucose Levels are fine';
        this.cholesterolInfo = 'Cholestrol Levels are fine';
        this.weight = true;
        this.glucose = true;
        this.bloodpressure = true;
        this.cholesterol = true;
        this.weightpresentedInfo = 'fa-check-circle'; //icon of 3rd point in req sheet.
        this.glucoseweightpresentedInfo = 'fa-check-circle'; //icon of 3rd point in req sheet.
        this.cholesterolpresentedInfo = 'fa-check-circle'; //icon of 3rd point in req sheet.
        this.presentedInfo = 'fa-check-circle'; //icon of 3rd point in req sheet.
        this.mesurementProvider = 'fa-user-md'; //icon of 4th point in req sheet.
        this.avgMonth = [];
        this.avgWeight = [];
        this.lineChartType = 'line';
        this.lineChartOptions = {
            responsive: true,
            scales: {
                // We use this empty structure as a placeholder for dynamic theming.
                xAxes: [
                    {
                        gridLines: {
                            // drawBorder: false,
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            // drawBorder: false,
                            display: false,
                        },
                    },
                ],
            },
            annotation: {
                annotations: [{}],
            },
        };
        this.lineChartLabels = [
            'Jan 2019',
            'Feb 2019',
            'Mar 2019',
            'Apr 2019',
            'May 2019',
            'June 2019',
        ];
        this.lineChartColors = [
            /*{
              backgroundColor: 'transparent',
              borderColor: 'rgba(46,134,171,1)',
              pointBackgroundColor: 'rgba(46,134,171,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(46,134,171,1)',
            },*/
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(242,87,87,0.8)',
                pointBackgroundColor: 'rgba(242,87,87,0.8)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(242,87,87,0.8)',
            },
        ];
        this.lineChartData = [
            { data: [65, 59, 300, 81, 56, 140], label: 'Weight' }
        ];
        this.contenteditable3 = false;
        this.contenteditable1 = false;
        this.contenteditable2 = false;
        this.contenteditable4 = false;
        // weightToggle() {
        //   this.weight = !this.weight;
        // }
        this.lineChartData1 = [
            // {data: [65, 59, 300, 81, 56, 140], label: 'Weight'},
            { data: [122, 234, 111, 222, 111, 123], label: 'glucose' }
        ];
        this.lineChartColors2 = [
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(224,116,0,0.8)',
                pointBackgroundColor: 'rgba(224,116,0,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(224,116,0,0.8)',
            }
        ];
        this.lineChartData2 = [
            { data: [65, 59, 300, 81, 56, 140], label: 'high' },
            { data: [122, 234, 111, 222, 111, 123], label: 'low' }
        ];
        this.lineChartColors3 = [
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(224,116,0,0.8)',
                pointBackgroundColor: 'rgba(224,116,0,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(224,116,0,0.8)',
            }
        ];
        this.lineChartData3 = [
            { data: [65, 159, 200, 85, 156, 140], label: 'cholesterol' },
        ];
    }
    ngOnInit() {
        // current weight
        this.dashboardService.getDashboard().subscribe((res) => {
            console.log(res);
            this.currentWeight = res;
        }, err => {
            console.log("error", err);
        });
        // // curent Glucose
        this.dashboardService.getGlucoses().subscribe((res) => {
            console.log(res);
            this.currentGlucose = res;
        }, err => {
            console.log("error", err);
        });
        // this.dashboardService.getCholesterol().subscribe(
        //   (res) => {
        //     console.log(res);
        //     this.currentCholesterol = res;
        //   },
        //   err => {
        //     console.log("error", err);
        //   }
        // );
        // this.dashboardService.getBloodPressure().subscribe(
        //   (res) => {
        //     console.log(res, 'ressssss');
        //     // console.log(res.highBP);
        //     this.currentHBP = res['highBP'];
        //     this.currentLBP = res['lowBP'];
        //     this.colorForBP(this.currentHBP, this.currentLBP)
        //     // console.log(this.currentLBP);
        //     // this.currentBlood = res.lowBP;
        //   },
        //   err => {
        //     console.log("error", err);
        //   }
        // );
        // // getWeightOfLoggedInUser()
        // this.dashboardService.getWeightOfLoggedInUser().subscribe(
        //   (res) => {
        //     console.log(res, 'ressssss');
        //   },
        //   err => {
        //     console.log("error", err);
        //   }
        // );
        // this.getApp.getWeightProfile().subscribe(
        //   (res) => {
        //     console.log(res, 'res');
        //   }, (err) => {
        //     console.log(err);
        //   }
        // )
        // this.getApp.getToken().subscribe(
        //   (res) => {
        //     console.log(res, 'res');
        //   }, (err) => {
        //     console.log(err);
        //   }
        // )
    }
    colorForBP(currentHBP, currentLBP) {
        if (currentHBP < 120 && currentLBP < 80) {
            this.colorClassForBP = 'green';
            this.presentedInfo = 'fa-check-circle';
        }
        else if ((120 <= currentHBP && currentHBP < 129) && currentLBP < 80) {
            this.colorClassForBP = 'yellow';
            this.presentedInfo = 'fa-exclamation-triangle';
            this.colorPresentedInfo = this.colorClassForBP;
        }
        else if ((129 <= currentHBP && currentHBP < 139) || (80 <= currentLBP && currentLBP < 89)) {
            this.colorClassForBP = 'darkYellow';
            this.presentedInfo = 'fa-exclamation-triangle';
            this.colorPresentedInfo = this.colorClassForBP;
        }
        else if ((139 <= currentHBP && currentHBP < 180) || (90 <= currentLBP && currentLBP < 120)) {
            this.colorClassForBP = 'red';
            this.presentedInfo = 'fa-exclamation-triangle';
            this.colorPresentedInfo = this.colorClassForBP;
        }
        else if (currentHBP >= 180 && currentLBP > 120) {
            this.colorClassForBP = 'darkRed';
            this.presentedInfo = 'fa-exclamation-triangle';
            this.colorPresentedInfo = this.colorClassForBP;
        }
        else if (currentHBP >= 180 || currentLBP > 120) {
            this.colorClassForBP = 'darkRed';
            this.presentedInfo = 'fa-exclamation-triangle';
            this.colorPresentedInfo = this.colorClassForBP;
        }
        else {
            this.colorClassForBP = 'grey';
        }
    }
    weightToggle() {
        this.weight = !this.weight;
        console.log("Success");
        // console.log(this.httpClient.get(this.url));
        this.avgMonth = [];
        this.avgWeight = [];
        this.dashboardService.getweight().subscribe((result) => {
            console.log(result);
            result.forEach(x => {
                console.log(x, 'xxxxxx');
                this.avgMonth.push(x.avgMonth);
                this.avgWeight.push(x.avgWeight);
                // console.log(this.httpClient.get(this.url));
            });
            console.log(this.avgMonth, 'moooo');
            console.log(this.avgWeight, 'weeeee');
            this.weightChart = new Chart('canvas', {
                type: 'line',
                data: {
                    labels: this.avgMonth,
                    datasets: [
                        {
                            data: this.avgWeight,
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(224,116,0,0.8)',
                            pointBackgroundColor: 'rgba(224,116,0,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(224,116,0,0.8)',
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                                display: true
                            }],
                        yAxes: [{
                                display: true,
                                ticks: {
                                    max: 400,
                                    min: 85,
                                    stepSize: 70
                                }
                            }],
                    }
                }
            });
        });
        // this.weightChart = new Chart('canvas', {
        //   type: 'line',
        //   data: {
        //     labels: ["124", "4"],//this.avgMonth,
        //     datasets: [
        //       {
        //         data: [1,2,3,4],//this.avgWeight,
        //         borderColor: '#3cba9f',
        //         // backgroundColor: "#0000FF",
        //       }
        //     ]
        //   },
        //   options: {
        //     legend: {
        //       display: false
        //     },
        //     scales: {
        //       xAxes: [{
        //         display: true
        //       }],
        //       yAxes: [{
        //         display: true
        //       }],
        //     }
        //   }
        // });
    }
    ngAfterViewChecked() {
    }
    glucoseToggle() {
        this.glucose = !this.glucose;
        // this.dashboardService.getGlucose().subscribe((result: Graph[]) => {
        //   console.log(result);
        //   result.forEach(x => {
        //     console.log(x, 'xxxxxx');
        //     this.avgMonth.push(x.avgMonth);
        //     this.avgWeight.push(x.avgWeight);
        //     // console.log(this.httpClient.get(this.url));
        //   });
        //   console.log(this.avgMonth, 'moooo');
        //   console.log(this.avgWeight, 'weeeee');
        //   this.weightChart = new Chart('canvas', {
        //     type: 'line',
        //     data: {
        //       labels: this.avgMonth,
        //       datasets: [
        //         {
        //           data: this.avgWeight,
        //           borderColor: '#3cba9f',
        //           backgroundColor: "#0000FF",
        //         }
        //       ]
        //     },
        //     options: {
        //       legend: {
        //         display: false
        //       },
        //       scales: {
        //         xAxes: [{
        //           display: true
        //         }],
        //         yAxes: [{
        //           display: true
        //         }],
        //       }
        //     }
        //   });
        // });
    }
    bloodpressureToggle() {
        this.bloodpressure = !this.bloodpressure;
        // this.dashboardService.getBlood().subscribe((result: Graph[]) => {
        //   console.log(result);
        //   result.forEach(x => {
        //     console.log(x, 'xxxxxx');
        //     this.avgMonth.push(x.avgMonth);
        //     this.avgWeight.push(x.avgWeight);
        //     // console.log(this.httpClient.get(this.url));
        //   });
        //   console.log(this.avgMonth, 'moooo');
        //   console.log(this.avgWeight, 'weeeee');
        //   this.BPChart = new Chart('canvas', {
        //     type: 'line',
        //     data: {
        //       labels: this.avgMonth,
        //       datasets: [
        //         {
        //           data: this.avgWeight,
        //           borderColor: '#3cba9f',
        //           backgroundColor: "#0000FF",
        //         }
        //       ]
        //     },
        //     options: {
        //       legend: {
        //         display: false
        //       },
        //       scales: {
        //         xAxes: [{
        //           display: true
        //         }],
        //         yAxes: [{
        //           display: true
        //         }],
        //       }
        //     }
        //   });
        // });
    }
    cholesterolToggle() {
        this.cholesterol = !this.cholesterol;
        // this.dashboardService.getCholesterol().subscribe((result: Graph[]) => {
        //   console.log(result);
        //   result.forEach(x => {
        //     console.log(x, 'xxxxxx');
        //     this.avgMonth.push(x.avgMonth);
        //     this.avgWeight.push(x.avgWeight);
        //     // console.log(this.httpClient.get(this.url));
        //   });
        //   console.log(this.avgMonth, 'moooo');
        //   console.log(this.avgWeight, 'weeeee');
        //   this.cholesterolChart = new Chart('canvas', {
        //     type: 'line',
        //     data: {
        //       labels: this.avgMonth,
        //       datasets: [
        //         {
        //           data: this.avgWeight,
        //           borderColor: '#3cba9f',
        //           backgroundColor: "#0000FF",
        //         }
        //       ]
        //     },
        //     options: {
        //       legend: {
        //         display: false
        //       },
        //       scales: {
        //         xAxes: [{
        //           display: true
        //         }],
        //         yAxes: [{
        //           display: true
        //         }],
        //       }
        //     }
        //   });
        // });
    }
    toggleContenteditableCholestrol() {
        this.contenteditable4 = !this.contenteditable4;
        if (!this.contenteditable4) {
            this.toggleSubmitCholestrol();
        }
    }
    toggleSubmitCholestrol() {
        this.contenteditable4 = false;
        this.details = this.currentCholesterol;
        console.log(this.details);
        let json = {
            chLevel: this.currentCholesterol
        };
        console.log(json);
        this.dashboardService.sendCholesterol(json);
    }
    toggleContenteditableWeight() {
        this.contenteditable1 = !this.contenteditable1;
        if (!this.contenteditable1) {
            this.toggleSubmitWeight();
        }
    }
    toggleSubmitWeight() {
        this.contenteditable1 = false;
        this.details = this.currentWeight;
        let json = {
            weight: this.currentWeight
        };
        this.dashboardService.postWeight(json);
    }
    toggleContenteditableGlucose() {
        this.contenteditable2 = !this.contenteditable2;
        if (!this.contenteditable2) {
            this.toggleSubmitGlucose();
        }
    }
    toggleSubmitGlucose() {
        this.contenteditable2 = false;
        this.details = this.currentGlucose;
        console.log(this.details);
        let json1 = {
            glucoseLevel: this.currentGlucose,
        };
        console.log(json1);
        this.dashboardService.sendGlucose(json1);
    }
    toggleContenteditableBlood() {
        this.contenteditable3 = !this.contenteditable3;
        if (!this.contenteditable3) {
            this.toggleSubmitBlood();
        }
    }
    toggleSubmitBlood() {
        this.contenteditable3 = false;
        // this.details=;
        this.details = this.currentHBP;
        this.details = this.currentLBP;
        console.log(this.details);
        //   console.log(this.details);
        // this.details = this.currentBlood1;
        let dataBP = {
            // highBP : this.high,
            highBP: this.currentHBP,
            lowBP: this.currentLBP
        };
        this.colorForBP(this.currentHBP, this.currentLBP);
        console.log("json1 " + JSON.stringify(dataBP));
        this.dashboardService.postBlood(dataBP);
    }
};
DashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map