import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let TestComponent = class TestComponent {
    constructor() {
        this.lineChartType = 'line';
        this.lineChartOptions = {
            responsive: true,
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
            },
            annotation: {
                annotations: [{}],
            },
        };
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
            { data: [65, 59, 300, 81, 56, 140, 554], label: 'high' },
            { data: [122, 234, 111, 222, 111, 123, 332], label: 'low' }
        ];
        this.lineChartLabels = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
        ];
        this.barChartOptions = {
            responsive: true,
            // We use these empty structures as placeholders for dynamic theming.
            scales: {
                xAxes: [{
                        gridLines: {
                            display: false,
                        }
                    }], yAxes: [{
                        gridLines: {
                            display: false,
                        },
                    }],
            },
            annotation: {
                annotations: [{}],
            }
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
    }
    ngOnInit() {
    }
};
TestComponent = tslib_1.__decorate([
    Component({
        selector: 'app-test',
        templateUrl: './test.component.html',
        styleUrls: ['./test.component.css']
    })
], TestComponent);
export { TestComponent };
//# sourceMappingURL=test.component.js.map