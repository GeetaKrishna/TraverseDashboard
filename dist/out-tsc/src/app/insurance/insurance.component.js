import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let InsuranceComponent = class InsuranceComponent {
    constructor(insuranceService) {
        this.insuranceService = insuranceService;
        this.date = "2019";
        this.dentalDeductable = 0;
        this.medicalDeductable = 0;
        this.presDeductable = 0;
        this.totalDeductable = 0;
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['Medical', 'Dental', 'Rx'];
        this.barChartType = 'horizontalBar';
        this.barChartLegend = true;
        this.barChartData = [
            { backgroundColor: 'rgba(153, 102, 255, 0.6)', borderColor: 'rgba(153, 102, 255, 1)', data: [this.medicalDeductable, this.dentalDeductable, this.presDeductable], label: 'Costs' }
        ];
        //---------------------------------------//
        this.deductChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.deductChartLabels = ['You', 'Sophia', 'Ethan', 'Kai'];
        this.deductChartType = 'horizontalBar';
        this.deductChartLegend = true;
        this.deductChartData = [
            { backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', data: [65, 59, 80, 100], label: 'Deductibles' }
        ];
    }
    // public chartType: string = 'horizontalBar';
    // public chartDatasets: Array<any> = [
    //   { data: [65, 59, 80], label: 'My First dataset' }
    // ];
    // public chartLabels: Array<any> = ['Medical','Dental','Rx'];
    // public chartColors: Array<any> = [
    //   {
    //     backgroundColor: [
    //       'rgba(255, 99, 132, 0.2)',
    //       'rgba(54, 162, 235, 0.2)',
    //       'rgba(255, 206, 86, 0.2)',
    //       'rgba(75, 192, 192, 0.2)',
    //       'rgba(153, 102, 255, 0.2)',
    //       'rgba(255, 159, 64, 0.2)'
    //     ],
    //     borderColor: [
    //       'rgba(255,99,132,1)',
    //       'rgba(54, 162, 235, 1)',
    //       'rgba(255, 206, 86, 1)',
    //       'rgba(75, 192, 192, 1)',
    //       'rgba(153, 102, 255, 1)',
    //       'rgba(255, 159, 64, 1)'
    //     ],
    //     borderWidth: 2,
    //   }
    // ];
    // public chartOptions: any = {
    //   responsive: true
    // };
    // public chartClicked(e: any): void { }
    // public chartHovered(e: any): void { }
    ngOnInit() {
        this.insuranceService.getPlans().subscribe((res) => {
            this.plans = res;
            console.log(this.plans);
            for (let index = 0; index < this.plans.length; index++) {
                console.log("Obained date " + this.plans[index].date);
                this.totalDeductable = this.plans[index].dentalDeductable + this.plans[index].medicalDeductable + this.plans[index].presDeductable;
                this.dentalDeductable = (this.plans[index].dentalDeductable / this.totalDeductable) * 100;
                this.medicalDeductable = (this.plans[index].medicalDeductable / this.totalDeductable) * 100;
                this.presDeductable = (this.plans[index].presDeductable / this.totalDeductable) * 100;
                console.log("Obtained deduct " + this.dentalDeductable);
                console.log("Obtained medicalDeductable " + this.medicalDeductable);
                console.log("Obtained presDeductable " + this.presDeductable);
                this.barChartData = [
                    { backgroundColor: 'rgba(153, 102, 255, 0.6)', borderColor: 'rgba(153, 102, 255, 1)', data: [this.medicalDeductable, this.dentalDeductable, this.presDeductable], label: 'Costs' }
                ];
            }
        }, err => {
            console.log("error", err);
        });
        this.insuranceService.getClaims().subscribe((res) => {
            console.log(res);
            this.claims = res;
        }, err => {
            console.log("error", err);
        });
    }
};
InsuranceComponent = tslib_1.__decorate([
    Component({
        selector: 'app-insurance',
        templateUrl: './insurance.component.html',
        styleUrls: ['./insurance.component.css']
    })
], InsuranceComponent);
export { InsuranceComponent };
//# sourceMappingURL=insurance.component.js.map